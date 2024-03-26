const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const ObjsService = require("../service/objs.service");
const BestManService = require("../service/mainpage.service");

class ObjsController {

    async delBestMan(req,res,next) {
        try{

            const id = req.body
            console.log('Контроллер ID удаляемого')
            console.log(id)
            const itogyman = await BestManService.delBestMan(id)
            console.log(itogyman)
            return res.json(itogyman)

        }catch (e){
            next(e)
        }
    }

    async viewBestMan(req,res,next) {
        try{

            const inn = req.body
            const itogyman = await BestManService.viewBestMan(inn)
            return res.json(itogyman)

        }catch (e){
            next(e)
        }
    }

    async pushBestMan(req,res,next) {
        try{

            const man = req.body
            const itogyman = await BestManService.pushBestMan(man)
            return res.json(itogyman)

        }catch (e){
            next(e)
        }
    }

    async getListObjs(req,res,next) {
         try{
             const inn = req.body.inn
             const list = await ObjsService.getObjects(inn)
             return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async getAllTabels(req,res,next) {
        try{
            const search = req.body
            console.log(search)
            const list = await ObjsService.getAllTabels(search)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async createTabels(req,res,next) {
        try{

            const tabel = req.body

            const list = await ObjsService.createTabels(tabel)
            return res.status(200).json(list)

        }catch (e){
            next(e)
        }
    }




        async showObjs(req,res,next) {
            try{

                const user = req.body

                const list = await ObjsService.showObjects(user)
                return res.json(list)

            }catch (e){
                next(e)
            }
        }

    async insertObjs(req,res,next) {
        try{

            const obj = req.body

            const list = await ObjsService.insertObjects(obj)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }


    async getT13(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.getT13(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async listTabelMans(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.listTabelMans(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }



}
module.exports = new ObjsController()