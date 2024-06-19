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

}
module.exports = new MessagesController()