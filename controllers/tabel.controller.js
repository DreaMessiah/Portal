
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const TabelService = require("../service/tabel.service");
const HistoryService = require("../service/history.service");
class TabelController {

    async myObj(req,res,next) {
        try{
            const id = req.body
            const list = await TabelService.myObj(id)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async getTransport(req,res,next) {
        try{
            const inn = req.body
            const list = await TabelService.getTransport(inn)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async plusMan(req,res,next) {
        try{
            const man = req.body
            const list = await TabelService.plusMan(man)
            await HistoryService.createAction(req.user.id,8,`Добавление сотрудника в табель для обьекта ${man.shifr} Месяц:${man.month} year:${man.year} name:${man.name}`)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async editDay(req,res,next) {
        try{
            const day = req.body
            const list = await TabelService.editDay(day)
            await HistoryService.createAction(req.user.id,8,`Редактирование табеля сотрудника в день:${day.day} Значение:${day.val} idline:${day.idline}`)
            return res.status(200).json(list)

        }catch (e){
            next(e)
        }
    }

    async getThisTabel(req,res,next) {
        try{
            const params = req.body
            const list = await TabelService.getThisTabel(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async blockedTabel(req,res,next) {
        try{
            const params = req.body
            const list = await TabelService.blockedTabel(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async getItogy(req,res,next) {
        try{
            const params = req.body
            const list = await TabelService.getItogy(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async trashYm(req,res,next) {
        try{
            const line = req.body
            const list = await TabelService.trashYm(line)
            await HistoryService.createAction(req.user.id,8,`Трэширование месячного табеля ID:${line.id}`)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new TabelController()