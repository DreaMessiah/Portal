const MessagesService = require('../service/messages.service')
const T13Service = require("../service/t13.service");
class MessagesController {
    async postMess(req,res,next) {
        try{
            const {mess} = req.body
            const messData = await MessagesService.pushMess(mess)
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
            console.log(req.body)
            console.log(req.files)
            //const file = req.body.file[0]
            //console.log(file)
            // const {tn,text} = req.body
            // const message = await MessagesService.sendMessage(tn,req.user.tn,text)
            return res.status(200).json('')
        }catch (e){
            next(e)
        }
    }

}
module.exports = new MessagesController()