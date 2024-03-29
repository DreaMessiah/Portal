const {Messages} = require('../models/models')
const ApiError = require('../exceptions/api.error')
const TabelDto = require("../dtos/tabelDto");
const { Op } = require('sequelize');
const sequelize = require("sequelize");

class MessagesService {
    async pushMess(mess) {
        await Messages.create({tn_to: mess.tn_to, tn_from: mess.tn_from, title: mess.title, text: mess.message, files: mess.files, trash: mess.trash, read: mess.read,})
        const listMess = await Messages.findAll({
            where: {
                [Op.or]: [
                    { tn_to: mess.tn_to, tn_from: mess.tn_from },
                    { tn_to: mess.tn_from, tn_from: mess.tn_to }
                ]
            },
            order: [['createdAt', 'DESC']]
        });
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
        });
        return listMess

    }

    // async getMyChats(tn) {
    //     console.log('Сервис сервера!!!!!')
    //     console.log(tn)
    //     const listChats = await Messages.findAll({
    //         where: {
    //             [Op.or]: [
    //                 { tn_to: tn},
    //                 { tn_from: tn }
    //             ]
    //         },
    //
    //         order: [['createdAt', 'DESC']]
    //     });
    //
    //     return listChats
    //
    // }

    async getMyChats(tn) {
        console.log('Сервис сервера!!!!!')
        console.log(tn)
        const listChatsTo = await Messages.findAll({
            where: { tn_to: tn },
            order: [['createdAt', 'DESC']]
        });

        const listChatsFrom = await Messages.findAll({
            where: { tn_from: tn },
            order: [['createdAt', 'DESC']]
        });

        // const listChatsTo = await Messages.findAll({
        //     where: {tn_from:tn},
        //     group: ['messages.tn_to','messages.id'],
        //     order: [['createdAt', 'DESC']]
        // });
        const uniqueChats = [...listChatsTo, ...listChatsFrom]

        const sortedList = uniqueChats.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
        return sortedList

    }

}
module.exports = new MessagesService()