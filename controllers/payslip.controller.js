const PhonesService = require('../service/phones.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
class PayslipController {
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

}
module.exports = new PayslipController()