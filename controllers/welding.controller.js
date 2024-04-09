
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const WeldingService = require("../service/welding.service");
class WeldingController {
    async getListObjs(req,res,next) {
         try{
            const inn = req.body.inn
             const list = await WeldingService.getObjects(inn)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }
    async getCrew(req,res,next) {
        try{
            const list = await WeldingService.getCrew()
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async getMyCrews(req,res,next) {
        try{
            const params = req.body.params
            const list = await WeldingService.getMyCrews(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async viewObjSV(req,res,next) {
        try{
            const list = await WeldingService.viewObjSV(req.body)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async pushObjWelding(req,res,next) {
        try{
            const obj = req.body
            const objsList = await WeldingService.pushObj(obj)

            return res.json(objsList.created)

        }catch (e){
            next(e)
        }
    }

    async getYM(req,res,next) {
        try{
            const innId = req.body
            const list = await WeldingService.getYM(innId)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }

    async crYM(req,res,next) {
        try{
            const params = req.body
            console.log(params)
            const list = await WeldingService.crYM(params)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }

    async getObgForHook(req,res,next) {
        try{

            const id = req.body.getShifr
            console.log(id)
            console.log('-------------------------'+id+'------------------------------')
            const list = await WeldingService.getObgForHook(id)
            return res.json(list.dataValues)
        }catch (e){
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            console.log('---------------------{ХРЕНЬ}----------------------------')
            next(e)
        }
    }



}
// pushObjWelding
module.exports = new WeldingController()