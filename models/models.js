const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    full_name:{type:DataTypes.STRING},
    login:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    avatar:{type:DataTypes.STRING},
    account:{type:DataTypes.STRING, unique:true},
    inn:{type:DataTypes.DATE},
    kdolg:{type:DataTypes.INTEGER}
})
module.exports = {
    User
}