const {Files, User, Messages, T13Black} = require('../models/models')
const ApiError = require("../exceptions/api.error")
const {Op} = require("sequelize");
class NotificationsService {
    async sendAll(text){
        const users = await User.findAll({where:{[Op.or]: [{ avatar: null },{ avatar: '' }]}})
        return await Promise.all( users.map( async item => {
            return await Messages.create({tn_to: item.dataValues.tn, tn_from: '999999999', title: '', text: text, files: null, trash_to: false,trash_from: false,read: false})
        }))
    }
}

module.exports = new NotificationsService()