const T13Service = require('../service/t13.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const {Struct, T13Uni} = require("../models/models");
const authMiddlewere = require("../middleware/auth.middleware");
const userService = require("../service/users.service");
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
    async getUnreg(req,res,next){
        try{
            const users = await T13Service.getUnreg()
            return res.status(200).json(users)
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
    async getAllPeoples(req,res,next){
        try{
            const workers = await T13Service.getAllPeoples()
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
            console.log(struct)
            const structure = await T13Service.createStructure(struct)
            return res.status(200).json(structure)
        }catch (e){
            next(e)
        }
    }
    async getWorkersBranch(req,res,next){
        try{
            const {branch} = req.body
            const workers =  await T13Service.getWorkersBranch(branch)
            return res.status(200).json(workers)
        }catch (e){
            next(e)
        }
    }
    async changeContact(req,res,next){
        try{
            const {worker,onContacts,contacts} = req.body
            const structuser =  await T13Service.changeContact(worker,onContacts,contacts)
            return res.status(200).json(structuser)
        }catch (e){
            next(e)
        }
    }
    async deleteBranch(req,res,next){
        try{
            const {branch} = req.body
            const del = await T13Service.deleteBranch(branch)
            return res.status(200).json(del)
        }catch (e){
            next(e)
        }
    }
    async sendHrm(req,res,next){
        try{
            const {report} = req.body
            const answer = await T13Service.sendHrm(req.user.tn,report)
            return res.status(200).json(answer)
        }catch (e){
            next(e)
        }
    }
    async checkHrm(req,res,next){
        try{
            const check = await T13Service.checkHrm(req.user.tn)
            return res.status(200).json(!!check)
        }catch (e){
            next(e)
        }
    }
    async getHrmAnswers(req,res,next){
        try{
            const answers = await T13Service.getHrmAnswers()
            return res.status(200).json(answers)
        }catch (e){
            next(e)
        }
    }
    async getContacts(req,res,next){
        try{
            const {name} = req.body
            const contact = await T13Service.getContacts(name)
            return res.status(200).json(contact)
        }catch (e){
            next(e)
        }
    }
    async changeBlack(req,res,next){
        try{
            const {list} = req.body
            const black = await T13Service.changeBlack(list)
            return res.status(200).json(black)
        }catch (e){
            next(e)
        }
    }
    async getBlack(req,res,next){
        try{
            const black = await T13Service.getBlack()
            return res.status(200).json(black)
        }catch (e){
            next(e)
        }
    }
    async getByeAnswers(req,res,next){
        try{
            const ans = await T13Service.getByeAnswers()
            return res.status(200).json(ans)
        }catch (e){
            next(e)
        }
    }
    async getTerm(req,res,next){
        try{
            const term = await T13Service.getTerm()
            return res.status(200).json(term)
        }catch (e){
            next(e)
        }
    }
    async getNewUsers(req,res,next){
        try{
            const newusers = await T13Service.getNewUsers()
            return res.status(200).json(newusers)
        }catch (e){
            next(e)
        }
    }


}
module.exports = new T13Controller()