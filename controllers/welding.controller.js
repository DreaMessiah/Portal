const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const WeldingService = require("../service/welding.service");
class WeldingController {
    async getListObjs(req,res,next) {
         try{
            const inn = req.body.inn
             const list = await WeldingService.getObjects(inn)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async viewObjSV(req,res,next) {
        try{
            const list = await WeldingService.viewObjSV(req.body)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async pushObjWelding(req,res,next) {
        try{
            const obj = req.body
            const objsList = await WeldingService.pushObj(obj)

            return res.json(objsList.created)

        }catch (e){
            next(e)
        }
    }

    async getYM(req,res,next) {
        try{
            const innId = req.body
            const list = await WeldingService.getYM(innId)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }
}
// pushObjWelding
module.exports = new WeldingController()