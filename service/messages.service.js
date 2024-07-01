const {Messages, User, OfferPosts, Chat, ChatUser, Message, ChatMessage, T13Black, MessageFiles, Struct} = require('../models/models')
const { Op } = require('sequelize');
const sequelize = require("sequelize");

class MessagesService {
    async pushMess(mess) {
        await Messages.create({tn_to: mess.tn_to, tn_from: mess.tn_from, title: mess.title, text: mess.message, files: '', trash_to: mess.trash,trash_from: mess.trash_from,read: mess.read})
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
    async messVoice(mess) {
        console.log(mess)
        await Messages.create({tn_to: mess.tn_to, tn_from: mess.tn_from, title: 'voice_voice', text: '', voice: mess.namevoice})
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

    async createChat(id,to,name,image){
        const userIds = [id,...to.map(item => item.id)]
        let newChat
        if(userIds.length === 2){
            const chatIds = await ChatUser.findAll({ attributes: ['chatId'], where: { userId: { [Op.in]: userIds } },
                group: ['chatId'],
                having: sequelize.literal(`COUNT(DISTINCT "userId") = ${userIds.length}`)
            }).then(chats => chats.map(chat => chat.chatId));
            if (chatIds.length > 0) {
                const existingChats = await Chat.findAll({ where: { id: { [Op.in]: chatIds } },
                    include: [{
                        model: User,
                        attributes: ['id'],
                        through: { attributes: [] }
                    },
                        {
                            model: Message,
                            required: true, // Исключает чаты, в которых нет сообщений
                            attributes: ['id', 'text','sees','service','author_id','createdAt'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['id', 'full_name','avatar'] // Атрибуты пользователя сообщения
                                },
                                {
                                    model: MessageFiles, // Подтягиваем файлы сообщений
                                    attributes: ['id', 'name'] // Атрибуты файла сообщения
                                }
                            ],
                            order: [['createdAt', 'DESC']] // Сортировка сообщений по дате создания
                        }
                    ],
                    order: [
                        [Message, 'createdAt', 'DESC'] // Сортировка чатов по новизне сообщений
                    ]
                })

                for (let chat of existingChats) {
                    const chatUserIds = chat.users.map(user => user.id).sort().toString()
                    if (chatUserIds === userIds.sort().toString()) {
                        console.log('Уже существующий')
                        return chat
                    }
                }
            }
            newChat = await Chat.create({creator_id:id})
        }else {
            const user = await User.findByPk(id)
            newChat = await Chat.create({creator_id:id,ongroup:true,name,image})
            const service = await Message.create({author_id:id,text:`${user.full_name} cоздал групповой чат`,service:true})
            await ChatMessage.create({chatId:newChat.id,cmessageId:service.id})
        }

        const chatUsers = userIds.map(userId => ({
            chatId: newChat.id,
            userId: userId
        }))
        await ChatUser.bulkCreate(chatUsers)

        console.log('Новый')
        return newChat
    }
    async sendChatAudio(id,to,filename,chat){

    }
    async sendChatMessage(id,to,text,files,chat){
        const message = await Message.create({author_id:id,text,files})
        const findChat = await Chat.findByPk(chat.id)
        await findChat.addCmessage(message)
        return await findChat.getCmessages({
            include: [
                {
                    model: User,
                    attributes: ['id', 'full_name','avatar'] // Атрибуты пользователя сообщения
                },
                {
                    model: MessageFiles, // Подтягиваем файлы сообщений
                    attributes: ['id', 'name'] // Атрибуты файла сообщения
                }
            ],order: [['createdAt', 'DESC']]})
    }
    async getMessages(chat){
        const findChat = await Chat.findByPk(chat.id)
        return await findChat.getCmessages({
            include: [
                {
                    model: User,
                    attributes: ['id', 'full_name','avatar'] // Атрибуты пользователя сообщения
                },
                {
                    model: MessageFiles, // Подтягиваем файлы сообщений
                    attributes: ['id', 'name'] // Атрибуты файла сообщения
                }
            ],order: [['createdAt', 'DESC']]})
    }
    async iSee(user_id,chat_id){
        const chat = await Chat.findByPk(chat_id)
        const messages = await chat.getCmessages()

        const updatePromises = messages.map(async message => {
            if (!message.sees.includes(user_id)) {
                message.set('sees', [...message.sees, user_id]) //// prev.set('next', prev.next.filter(value => value !== 1)) //даление элемента 1 из массива
                await message.save()
            }
        })
        return await Promise.all(updatePromises)
    }
    async getChats(id){
        console.log(id)
        const list = await Chat.findAll({
            include: [
                {
                    model: User,
                    where: { id: id },
                    through: { attributes: [] } // Исключает атрибуты из промежуточной таблицы
                },
                {
                    model: Message,
                    required: true, // Исключает чаты, в которых нет сообщений
                    attributes: ['id', 'text','sees','author_id','service','createdAt'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'full_name','avatar'] // Атрибуты пользователя сообщения
                        },
                        {
                            model: MessageFiles, // Подтягиваем файлы сообщений
                            attributes: ['id', 'name'] // Атрибуты файла сообщения
                        }
                    ],
                    order: [['createdAt', 'DESC']] // Сортировка сообщений по дате создания
                }
            ],
            order: [
                [Message, 'createdAt', 'DESC'] // Сортировка чатов по новизне сообщений
            ]
        })
        const chats = await Promise.all( list.map( async item => {
            const users = await ChatUser.findAll({where:{chatId:item.dataValues.id,userId: {[Op.ne]: id }},include:[{model:User}]})
            return {...item.dataValues,inchat:users}
        }))
        return chats
    }

    async findChat(id,to){
        const userIds = [id,...to.map(item => item.id)]

        // const chatIds = await ChatUser.findAll({
        //     attributes: ['chatId'],
        //     where: {
        //         userId: {
        //             [Op.in]: userIds
        //         }
        //     }
        // })
        //
        // const existingChats = await Chat.findAll({
        //     where: {
        //         id: {
        //             [Op.in]: chatIds
        //         }
        //     },
        //     include: [{
        //         model: User,
        //         attributes: ['id'],
        //         through: { attributes: [] }
        //     }]
        // });


        // Если чат не найден, создаем новый чат
        const newChat = await Chat.create();

        // Ассоциируем пользователей с новым чатом
        const chatUsers = userIds.map(userId => ({
            chatId: newChat.id,
            userId: userId
        }))
        await ChatUser.bulkCreate(chatUsers)

        return newChat
    }
}
module.exports = new MessagesService()