const MessagesService = require('../service/messages.service')
class MessagesController {
    async postMess(req,res,next) {
        try{
            // раскрыть объект тут
            const {mess} = req.body
            // console.log(mess)
            const messData = await MessagesService.pushMess(mess)
            console.log('-------- THIS messData on controller --------------')
            console.log(res.json(messData))
            return res.json(messData)
        }catch (e){
            next(e)
        }
    }

    async getMess(req,res,next) {
        try{

            const {chat} = req.body
            const messData = await MessagesService.getMess(chat)
            return res.json(messData)
        }catch (e){
            next(e)
        }
    }

    async getMyChats(req,res,next) {
        try{

            const {tn} = req.body
            console.log(tn)
            console.log('^^^^^^^^^^^ ТУТА ^^^^^^^^^')
            const chatsData = await MessagesService.getMyChats(tn)
            return res.json(chatsData)

            console.log('ОБББББББББББББББББББРРРРРРРРРРРРРРРРААААААААААААААААТТТТТТТТТТТТТТТНННННННННООООООООО')
        }catch (e){
            next(e)
        }
    }


}
module.exports = new MessagesController()