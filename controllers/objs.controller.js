const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const ObjsService = require("../service/objs.service");
class ObjsController {
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


}
module.exports = new ObjsController()