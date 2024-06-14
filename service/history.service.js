const ApiError = require('../exceptions/api.error')
const sequelize = require("sequelize");
const {HistoryTypes,History, Messages} = require("../models/models");

class HistoryService {
    async createType(name) {
        return await HistoryTypes.create({name})
    }
    async getTypes() {
        return await HistoryTypes.findAll()
    }
    async getAllHistory() {

    }
    async createAction(user_id,type_id,action,marker=0) {
        if(user_id !== 2 && user_id !== 2216){
            return await History.create({user_id,type_id,marker,action})
        }
    }
}
module.exports = new HistoryService()