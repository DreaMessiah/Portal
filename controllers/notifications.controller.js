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

}
module.exports = new NotificationsController()