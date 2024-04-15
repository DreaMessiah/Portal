
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const TabelService = require("../service/tabel.service");
class TabelController {

    async myObj(req,res,next) {
        try{
            const id = req.body
            const list = await TabelService.myObj(id)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async getTransport(req,res,next) {
        try{
            const inn = req.body
            const list = await TabelService.getTransport(inn)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async plusMan(req,res,next) {
        try{
            const man = req.body
            const list = await TabelService.plusMan(man)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async editDay(req,res,next) {
        try{
            const day = req.body
            const list = await TabelService.editDay(day)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async getThisTabel(req,res,next) {
        try{
            const params = req.body
            const list = await TabelService.getThisTabel(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async blockedTabel(req,res,next) {
        try{
            const params = req.body
            const list = await TabelService.blockedTabel(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async getItogy(req,res,next) {
        try{
            const params = req.body
            const list = await TabelService.getItogy(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async trashYm(req,res,next) {
        try{
            const line = req.body
            const list = await TabelService.trashYm(line)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }
}
module.exports = new TabelController()