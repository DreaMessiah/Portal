const {Messages, User, OfferPosts} = require('../models/models')
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
    async sendMessage(tn,from,text) {
        return await Messages.create({tn_to: tn, tn_from: from,text})
    }

    async getMess(chat) {
        const listMess = await Messages.findAll({
            where: {
                [Op.or]: [
                    { tn_to: chat.tn_to, tn_from: chat.tn_from },
                    { tn_to: chat.tn_from, tn_from: chat.tn_to }
                ]
            },    include: [
                {
                    model: User,
                    as: 'ToUser',
                    attributes: ['avatar', 'full_name']
                },
                {
                    model: User,
                    as: 'FromUser',
                    attributes: ['avatar', 'full_name']
                }
            ],
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
    async offerPost(content) {
        const response = await OfferPosts.create({user_id: content.user_id, content: content.content})
        const mans = ['0000000130', '2140012136', '00ЗП-00352', '00ЗП-00450', '999999999']
        mans.forEach(man => {
            Messages.create({tn_to: man, tn_from: content.user_tn, title: 'Предложение новости', text: content.content, files: null, trash_to: false, trash_from: false, read: false})
        })
        return response
    }

}
module.exports = new MessagesService()