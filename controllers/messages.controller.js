const fs = require('fs');
const config = require('config')
const MessagesService = require('../service/messages.service')
const T13Service = require("../service/t13.service");
const ApiError = require("../exceptions/api.error");
const {Sequelize,Op} = require('sequelize')
const sharp = require("sharp");
const PATH = require('path');
const Jimp = require('jimp')
const FileDto = require('../dtos/fileDto')
const HistoryService = require("../service/history.service");
const FilesService = require("../service/files.service");

class MessagesController {
    async postMess(req,res,next) {
        try{
            const {mess} = req.body
            const messData = await MessagesService.pushMess(mess)
            await HistoryService.createAction(req.user.id,10,`Отправлено сообщение пользователю ${mess.name_to}`)
            return res.status(200).json(messData)
        }catch (e){
            next(e)
        }
    }
    async getMess(req,res,next) {
        try{
            const {chat} = req.body
            const messData = await MessagesService.getMess(chat)
            return res.status(200).json(messData)
        }catch (e){
            next(e)
        }
    }
    async getMyChats(req,res,next) {
        try{
            const {tn} = req.body
            const chatsData = await MessagesService.getMyChats(tn)
            return res.status(200).json(chatsData)
        }catch (e){
            next(e)
        }
    }
    async searchMess(req,res,next) {
        try{
            const tn = req.body.tn
            const chatsData = await MessagesService.searchMess(tn)
            return res.status(200).json(chatsData)
        }catch (e){
            next(e)
        }
    }
    async sendMessage(req,res,next) {
        try{
            const {tn,text} = req.body
            const message = await MessagesService.sendMessage(tn,req.user.tn,text)
            await HistoryService.createAction(req.user.id,10,`Отправлено сообщение пользователю ${tn}`)
            return res.status(200).json(message)
        }catch (e){
            next(e)
        }
    }
    async offerPost(req,res,next) {
        try{
            const {content} = req.body
            const user_id = req.user.id
            const user_tn = req.user.tn
            const message = await MessagesService.offerPost({content, user_id, user_tn})
            return res.status(200).json(message)
        }catch (e){
            next(e)
        }
    }
    async messVoice(req,res,next) {
        try{
            // console.log(req.body)
            // console.log(req.files)
            const tn_to = req.body.tn_to
            const tn_from = req.body.tn_from
            const voice = req.files.blob
            let nametime = new Date()
            nametime = nametime.getTime();
            const namevoice = tn_from+'_'+nametime
            if(voice.size > 1000000000){
                return {err: 'Большой размер файла'}
            }else{
                // if(voice){
                let path = PATH.join(config.get('file_path'),`voice`,`${namevoice}.mp3`);
                // }
                if(fs.existsSync(path)){
                    return res.status(400).json({message: 'Файл с таким именем уже существует'})
                }
                await voice.mv(path)
                //const file = req.body.file[0]
                //console.log(file)
                // const {tn,text} = req.body
                const message = await MessagesService.messVoice({tn_to,tn_from,namevoice})


                return res.status(200).json(message)
            }

        }catch (e){
            next(e)
        }
    }


    async createChat(req,res,next) {
        try{
            const {user,group,name,image} = req.body
            const to = group.length ? group : [user]
            const chat =  await MessagesService.createChat(req.user.id,to,name,image)
            return res.status(200).json(chat)
        }catch (e){
            next(e)
        }
    }
    async sendChatMessage(req,res,next) {
        try{
            const audio = req.files ? req.files.blob : null

            const user = JSON.parse(req.body.user)
            const group = JSON.parse(req.body.group)
            const files = JSON.parse(req.body.files)
            const chat = JSON.parse(req.body.chat)
            const message = req.body.message

            const to = group.length ? group : [user]

            let list
            if(audio && audio.size < 1000000000){
                const filename = req.user.id + '_' + new Date().getTime()
                let path = PATH.join(config.get('file_path'),`voice`,`${filename}.mp3`)
                await audio.mv(path)
                list = await MessagesService.sendChatAudio(req.user.id,to,filename,chat)
            }else{
                list = await MessagesService.sendChatMessage(req.user.id,to,message,files,chat)
            }

            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async getMessages(req,res,next) {
        try {
            const list = await MessagesService.getMessages(req.body.chat)
            return res.status(200).json(list)
        }catch (e) {
            next(e)
        }
    }
    async getChats(req,res,next) {
        try {
            const list = await MessagesService.getChats(req.user.id)
            return res.status(200).json(list)
        }catch (e) {
            next(e)
        }
    }
    async iSee(req,res,next) {
        try {
            const {id} = req.body
            const list = await MessagesService.iSee(req.user.id,id)
            return res.status(200).json(list)
        }catch (e) {
            next(e)
        }
    }

    async loadGroupAvatar(req,res,next) {
        try {
            const file = req.files.file
            const newname = FilesService.generateRandomFileName()
            const type = file.name.split('.').pop()
            const path = PATH.join(`${config.get('public_path')}`,'profile',`${newname}.${type}`);
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)
            await FilesService.compressResizeAndSaveImage(path,80, 300, 400)
            const avatar = `${newname}.${type}`
            await HistoryService.createAction(req.user.id,3,`Загрузка аватара для группы чатов`,2)
            return res.status(200).json({path:avatar})
        } catch (e) {
            next(e)
        }
    }


}
module.exports = new MessagesController()