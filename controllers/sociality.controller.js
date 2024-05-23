const SocialityService = require("../service/sociality.service");
const {TableZayavka, User, Objects, Statuses} = require("../models/models");
class socialityController {

    async getProgram(req,res,next) {
        try{
            const list = await SocialityService.getProgram()
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async createProgram(req,res,next) {

        try{
            const program = req.body.program
            const newprogram = await SocialityService.createProgram(program)
            return res.status(200).json(newprogram)
        }catch (e){
            next(e)
        }
    }

    async updateProgram(req,res,next) {

        try{
            const program = req.body
            const updatedProgram = await SocialityService.updateProgram(program)
            return res.status(200).json(updatedProgram)
        }catch (e){
            next(e)
        }
    }

    async delProgram(req,res,next) {

        try{
            const program = req.body
            const updatedProgram = await SocialityService.delProgram(program)
            return res.status(200).json(updatedProgram)
        }catch (e){
            next(e)
        }
    }

    async getComission(req,res,next) {

        try{
            const list = await SocialityService.getComission()
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async plusComission(req,res,next) {

        try{
            const man = req.body
            const newman = await SocialityService.plusComission(man)
            return res.status(200).json(newman)
        }catch (e){
            next(e)
        }
    }

    async delComission(req,res,next) {

        try{
            const man = req.body
            const delman = await SocialityService.delComission(man)
            return res.status(200).json(delman)
        }catch (e){
            next(e)
        }
    }



}
module.exports = new socialityController()