import express from 'express';
import bodyParser from 'body-parser'
import sequelize from './database.js';
import User from './userModel.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log("A request came!");
    res.send("Hello World!");
})


app.post('/sign-up', async (req, res) => {
    const { name, age, password, email, gender } = req.body;

    const user1 = await User.create({ name, age, password, email, gender });
    try {
        if (user1) {
            res.status(200).json({
                "success": true,
                "data": {
                    name: name,
                    age: age,
                    gender: gender,
                    password: password
                }
            })
        }
        else {
            res.status(500).json({
                "message" : "Something went wrong!"
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            "message" : "Something went wrong!"
        })
        
    }
    
});

app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(404).json(
            {
                "success": false,
                "message": "Email or Password can't be empty!"
            }
        )
    }
    const user = await User.findOne({where : {email , password}})

    if (user) {
            res.status(200).json({
                "success": true,
                "message": "Succesfully Logged In!",
            })
    }else {
            res.status(404).json({
                "success": false,
                "message": "Invalid Creditionals!"
            })
        }
    });

app.get("/user", async (req, res) => {

    const { email } = req.query;
    const user = await User.findOne({where : {email}});
    console.log(user);
    if (user) {
        res.status(200).json({
            "success": true,
            "data":{
                "name" : user.name,
                "age" : user.age,
                "email" : user.email,
                "gender" : user.gender
            }
        })
    }
    else {
        res.status(404).json({
            "success": false,
            "message": "User not found!!"
        })
    }

})


app.listen(PORT, () => {
    console.log("Server is running on port 3000")
}
)