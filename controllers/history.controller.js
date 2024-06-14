const HistoryService = require("../service/history.service");

class HistoryController {

    async createType(req,res,next) {
        try{
            const type = await HistoryService.createType(req.body.name)
            return res.status(200).json(type)
        }catch (e){
            next(e)
        }
    }
    async getTypes(req,res,next) {
        try{
            const types = await HistoryService.getTypes()
            return res.status(200).json(types)
        }catch (e){
            next(e)
        }
    }
    async getAllHistory(req,res,next) {
        try{

        }catch (e){
            next(e)
        }
    }

    async createAction(req,res,next) {
        try{

        }catch (e){
            next(e)
        }
    }
}
module.exports = new HistoryController()