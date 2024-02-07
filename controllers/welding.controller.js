const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const WeldingService = require("../service/welding.service");
class WeldingController {
    async getListObjs(req,res,next) {
         try{
            const inn = req.body.inn
             const list = await WeldingService.getObjects(inn)
             // console.log(list)
            return res.json(list)

        }catch (e){
            console.log(e.message)
            next(e)
        }
    }

    async pushObjWelding(req,res,next) {
        try{
            console.log(req)
            const obj = req.body  // получаем объект
            // const objsList = await WeldingService.pushObj(obj)

            // выполняем действия
            console.log('здесь начало')
            console.log(obj)
            // return res.json(objsList)

        }catch (e){
            console.log(e.message)
            console.log('здесь творится какое-то блядство...')
            next(e)
        }
    }

}
// pushObjWelding
module.exports = new WeldingController()