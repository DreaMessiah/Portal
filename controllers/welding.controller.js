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

    async viewObjSV(req,res,next) {
        try{
            console.log('--------------------------[ х у й ]------------------------------')
            console.log('')
            console.log('')
            console.log('')
            console.log('')
            console.log('сцук')
            console.log(req.body.inn)
            console.log(req.body.login)
            console.log('')
            console.log('')
            console.log('')
            console.log('')
            console.log('')
            console.log('-------------------------------------------------------------')

            // const inn = req.body.inn
            const list = await WeldingService.viewObjSV(req.body)
            console.log(list)
            return res.json(list)

        }catch (e){
            console.log(e.message)
            next(e)
        }
    }

    async pushObjWelding(req,res,next) {
        try{
//            console.log(req)
            const obj = req.body  // получаем объект
 //           console.log(obj)
            const objsList = await WeldingService.pushObj(obj)

            // выполняем действия
           console.log('здесь начало')
           console.log(objsList.created)
            return res.json(objsList.created)

        }catch (e){
            console.log('здесь творится какое-то блядство...')
            console.log(e.message)
            next(e)
        }
    }

}
// pushObjWelding
module.exports = new WeldingController()