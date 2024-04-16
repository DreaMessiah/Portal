const T13Service = require('../service/t13.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
class T13Controller {
    async get(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при чтении таблицы Т13',errors.array()))
            const {userid} = req.body
            const t13Data = await T13Service.get(userid)
            return res.json(t13Data)
        }catch (e){
            next(e)
        }
    }
    async getActual(req,res,next) {
        try{
            const t13Data = await T13Service.getActual(req.user.inn)
            return res.status(200).json(t13Data)
        }catch (e){
            next(e)
        }
    }


}
module.exports = new T13Controller()