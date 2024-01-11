const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    fname:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    sname:{type:DataTypes.STRING},
    dwork:{type:DataTypes.STRING},
    duvol:{type:DataTypes.DATE},
    tel:{type:DataTypes.STRING, unique:true},
    dlast:{type:DataTypes.DATE},
    kdolg:{type:DataTypes.INTEGER}
})
