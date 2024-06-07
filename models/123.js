const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const SrtoObjects = sequelize.define('typesnotifications',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    object:{type:DataTypes.INTEGER},
})

SrtoObjects.belongsTo(Objects, { foreignKey: 'obj', targetKey: 'id', as: 'objects'})
Objects.hasMany(SrtoObjects, { foreignKey: 'obj', sourceKey: 'id', as: 'srto'})