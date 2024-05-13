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
    async getWorkers(req,res,next) {
        try{
            const workers = await T13Service.getWorkers(req.user.inn)
            return res.status(200).json(workers)
        }catch (e){
            next(e)
        }
    }
    async getUni(req,res,next){
        try{
            const workers = await T13Service.getUni(req.user.inn)
            return res.status(200).json(workers)
        }catch (e){
            next(e)
        }
    }
    async getBranchs(req,res,next){
        try{
            const branchs = await T13Service.getBranchs()

            return res.status(200).json(branchs)
        }catch (e){
            next(e)
        }
    }
    async getStructure(req,res,next){
        try{
            const structure = await T13Service.getStructure()
            return res.status(200).json(structure)
        }catch (e){
            next(e)
        }
    }
    async createStructure(req,res,next){
        try{
            const {struct} = req.body
            const structure = await T13Service.createStructure(struct)
            return res.status(200).json(structure)
        }catch (e){
            next(e)
        }
    }

}
module.exports = new T13Controller()