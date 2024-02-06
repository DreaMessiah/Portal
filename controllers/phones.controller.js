const PhonesService = require('../service/phones.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
class PhonesController {
    async get(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при чтении адресной книги',errors.array()))
            const phonesData = await PhonesService.get()
            return res.json(phonesData)
        }catch (e){
            next(e)
        }
    }
    async add(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при записи в адресную книгу',errors.array()))
            const {name,mobile_phone,city_phone,ats,email,position,job,order,heading} = req.body
            const phonesData = await PhonesService.add(name,mobile_phone,city_phone,ats,email,position,job,order,heading)
            return res.json(phonesData)
        }catch (e){
            next(e)
        }
    }

}
module.exports = new PhonesController()