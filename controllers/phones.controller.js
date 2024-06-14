const PhonesService = require('../service/phones.service')
const {validationResult} = require('express-validator')
const mailService = require('../service/mail.service')
const ApiError = require('../exceptions/api.error')
const HistoryService = require("../service/history.service");
class PhonesController {
    async get(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при чтении адресной книги',errors.array()))
            const phonesData = await PhonesService.get()
            await HistoryService.createAction(req.user.id,5,`Просмотр телефонной книги`)
            return res.status(200).json(phonesData)
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
            return res.status(200).json(phonesData)
        }catch (e){
            next(e)
        }
    }
    async getmanagers(req,res,next) {
        try{
            const managers = await PhonesService.getmanagers()
            const contacts = managers.map( item => {
                return {...item.dataValues,value:item.id,label:item.name}
            })
            return res.status(200).json(contacts)
        }catch (e) {
            next(e)
        }
    }
    async sendmail(req,res,next) {
        try{
            const {to,title,text,tn} = req.body
            await HistoryService.createAction(req.user.id,5,`Обращение с главной страницы с поддержку`)
            const result = await mailService.sendQuestionToManager(to,title,text,req.user,tn)
            console.log(result)
            return res.status(200).json({message:'Сообщение отправлено'})
        }catch (e) {
            next(e)
        }
    }

    async change(req,res,next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при обновлении адресной книги',errors.array()))
            const {id,name,mobile_phone,city_phone,ats,email,position,job,order} = req.body
            const contact = await PhonesService.change(id,name,mobile_phone,city_phone,ats,email,position,job,order)
            return res.json(contact)
        }catch (e){
            next(e)
        }
    }
    async delete(req,res,next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при удалении контакта',errors.array()))
            const {id} = req.body
            const contact = await PhonesService.delete(id)
            return res.json(contact)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new PhonesController()