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
            const {sort,direction,page,type,date,user} = req.body
            const history = await HistoryService.getAllHistory(sort,direction,page,type,date,user)
            return res.status(200).json(history)
        }catch (e){
            next(e)
        }
    }
    async getHoursHistory(req,res,next) {
        try{
            const hours = await HistoryService.getHoursHistory(req.body.day)
            const days = await HistoryService.getActionCountsForLast7Days()
            return res.status(200).json({hours,days})
        }catch (e){
            next(e)
        }
    }
    async getMonthHistory(req,res,next) {
        try{
            const month = await HistoryService.getActionCountsForMonth(req.body.month)
            return res.status(200).json(month)
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