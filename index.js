import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get('/', (req,res)=>{
    console.log("A request came!");
    res.send("Hello World!");
})

const data = {};

app.post('/sign-up' , (req,res)=>{
    const {name , age , password , email , gender} = req.body;
    
    data[email] = {
        name : name,
        age : age,
        gender : gender,
        password : password
    }
    console.log(data[email]);
    res.status(200).json({
        "success" : true,
        "data" : {
            name : name,
            age : age,
            gender : gender,
            password : password
        }
    })
    
});


app.listen(PORT , ()=>
{
    console.log("Server is running on port 3000")
}
)