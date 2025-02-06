import sequelize from './database.js';

const User = sequelize.define("User",{
    email : {
        type : sequelize.Sequelize.STRING,
        primaryKey : true,
        allowNull : false
    },
    password : {
        type : sequelize.Sequelize.STRING,
        allowNull : false
    },
    name : {
        type : sequelize.Sequelize.STRING,
        allowNull : false
    },
    age : {
        type : sequelize.Sequelize.STRING,
        allowNull : false
    },
    gender : {
        type : sequelize.Sequelize.STRING,
        allowNull : false
    }
})

export default User;