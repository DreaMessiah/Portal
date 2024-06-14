const NotificationsService = require("../service/notofications.service");
class NotificationsController {
    async sendAll(req,res,next) {
        try{
            const messages = await NotificationsService.sendAll(req.body.message)
            return res.status(200).json(messages)
        }catch (e){
            next(e)
        }
    }
    async createType(req,res,next) {
        try{
            const messages = await NotificationsService.createTypes(req.body.name,req.body.img)
            return res.status(200).json(messages)
        }catch (e){
            next(e)
        }
    }
    async loadTypes(req,res,next) {
        try{
            const types = await NotificationsService.loadTypes()
            return res.status(200).json(types)
        }catch (e){
            next(e)
        }
    }
    async removeType(req,res,next) {
        try{
            const types = await NotificationsService.removeType(req.body.id)
            return res.status(200).json(types)
        }catch (e){
            next(e)
        }
    }



}
module.exports = new NotificationsController()