const SocialityService = require("../service/sociality.service");
const {TableZayavka, User, Objects, Statuses, Files} = require("../models/models");
const PATH = require("path");
const config = require("config");
const fs = require("fs");
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

    async createZaSocial(req,res,next) {

        try{
            const za = req.body
            za.user = req.user
            const newza = await SocialityService.createZaSocial(za)
            return res.status(200).json(newza)
        }catch (e){
            next(e)
        }
    }

    async getMyZa(req,res,next) {

        try{
            const user = req.user
            const list = await SocialityService.getMyZa(user)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async getAllZa(req,res,next) {

        try{
            const list = await SocialityService.getAllZa()
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async downloadDoc(req,res,next) {

        try{
            const doc = req.body.doc
            // const {id} = req.body
            // const file = await Files.findByPk(id)
            // if(!file) return res.status(400).json({message: 'Файл не найден'})
            // if(file.type !== 'dir'){
                const path = PATH.join(`${config.get('public_path')}`,`social`,`${doc.folder}`,`${doc.docname}`)
            console.log(path)
                if(fs.existsSync(path)){
                     return res.download(path,doc.docname)
                }
            // }
            // return res.status(400).json({message: 'Файл не найден'})


        }catch (e){
            next(e)
        }
    }
    async reverStatus(req,res,next) {

        try{
            const st = req.body
            const newst = await SocialityService.reverStatus(st)
            return res.status(200).json(newst)
        }catch (e){
            next(e)
        }
    }
    async makeProtocol(req,res,next) {

        try{
            const list = req.body
            const tn = req.user.tn
            list.maker = tn
            const make = await SocialityService.makeProtocol(list)
            return res.status(200).json(make)
        }catch (e){
            next(e)
        }
    }

    async getProtocols(req,res,next) {
        try{
            const {sort,direction} = req.body
            const protocols = await SocialityService.getProtocols(sort,direction)
            return res.status(200).json(protocols)
        }catch (e){
            next(e)
        }
    }
    async getProtStatus(req,res,next) {
        try{
            const statuses = await SocialityService.getProtStatus()
            return res.status(200).json(statuses)
        }catch (e){
            next(e)
        }
    }


}
module.exports = new socialityController()