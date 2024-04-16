const ManService = require("../service/mans.service");
const {TableZayavka, User, Objects, Statuses} = require("../models/models");
class MansController {
    async getHumanList(req,res,next) {
        try{
            const list = await ManService.getHumanList()
            return res.json(list)
        }catch (e){
            next(e)
        }
    }

    async plusManHR(req,res,next) {
         try{
            const man = req.body
             const list = await ManService.plusManHR(man)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }

    async delManHumanList(req,res,next) {
        try{
            const man = req.body
            const list = await ManService.delManHumanList(man)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }


}
module.exports = new MansController()