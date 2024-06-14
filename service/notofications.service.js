const {Files, User, Messages, T13Black, TypesNotifications} = require('../models/models')
const ApiError = require("../exceptions/api.error")
const {Op} = require("sequelize");
class NotificationsService {
    async sendAll(text){
        const users = await User.findAll()
        return await Promise.all( users.map( async item => {
            return await Messages.create({tn_to: item.dataValues.tn, tn_from: '999999999', title: '', text: text, files: null, trash_to: false,trash_from: false,read: false})
        }))
    }
    async createTypes(name,img){
        return await TypesNotifications.create({name,img})
    }
    async loadTypes(){
        return await TypesNotifications.findAll()
    }
    async removeType(id){
        const type = await TypesNotifications.findByPk(id)
        await type.destroy()
        return true
    }


}

module.exports = new NotificationsService()