const {Messages} = require('../models/models')
const { Op } = require('sequelize');
class MessagesService {
    async pushMess(mess) {
        await Messages.create({tn_to: mess.tn_to, tn_from: mess.tn_from, title: mess.title, text: mess.message, files: mess.files, trash_to: mess.trash,trash_from: mess.trash_from,read: mess.read})
        const listMess = await Messages.findAll({
            where: {
                [Op.or]: [
                    { tn_to: mess.tn_to, tn_from: mess.tn_from },
                    { tn_to: mess.tn_from, tn_from: mess.tn_to }
                ]
            },
            order: [['createdAt', 'DESC']]
        })
        return listMess
    }
    async getMess(chat) {
        const listMess = await Messages.findAll({
            where: {
                [Op.or]: [
                    { tn_to: chat.tn_to, tn_from: chat.tn_from },
                    { tn_to: chat.tn_from, tn_from: chat.tn_to }
                ]
            },
            order: [['createdAt', 'DESC']]
        })
        for(const mess of listMess){
            const thismess = mess.dataValues
            if(thismess.tn_from === chat.tn_to){
                const reading = await Messages.findOne({where:{id:thismess.id}})
                reading.read = true
                await reading.save()
            }
        }
        return listMess
    }
    async getMyChats(tn) {
        const listChatsTo = await Messages.findAll({
            where: { tn_to: tn },
            order: [['createdAt', 'DESC']]
        })
        const listChatsFrom = await Messages.findAll({
            where: { tn_from: tn },
            order: [['createdAt', 'DESC']]
        })
        const uniqueChats = [...listChatsTo, ...listChatsFrom]
        return uniqueChats.sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)
            return dateB - dateA
        })
    }

    async searchMess(tn) {
        return await Messages.findAll({where: {tn_to: tn.tn, read: false}});
    }
}
module.exports = new MessagesService()