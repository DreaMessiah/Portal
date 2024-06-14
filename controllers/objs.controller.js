const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const ObjsService = require("../service/objs.service");
const BestManService = require("../service/mainpage.service");
const HistoryService = require("../service/history.service");
const {logger} = require("sequelize/lib/utils/logger");

class ObjsController {
    async thisObj(req,res,next) {
        try{
            const object_id = req.body
            const shifr = await ObjsService.thisObj(object_id)
            return res.status(200).json(shifr)
        }catch (e){
            next(e)
        }
    }
    async delBestMan(req,res,next) {
        try{
            const id = req.body
            const itogyman = await BestManService.delBestMan(id)
            return res.status(200).json(itogyman)
        }catch (e){
            next(e)
        }
    }
    async viewBestMan(req,res,next) {
        try{
            const inn = req.body
            const itogyman = await BestManService.viewBestMan(inn)
            return res.status(200).json(itogyman)
        }catch (e){
            next(e)
        }
    }
    async pushBestMan(req,res,next) {
        try{
            const man = req.body
            const itogyman = await BestManService.pushBestMan(man)
            return res.status(200).json(itogyman)
        }catch (e){
            next(e)
        }
    }
    async getListObjs(req,res,next) {
         try{
             const list = await ObjsService.getObjects(req.user.inn)
             return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async getAllTabels(req,res,next) {
        try{
            const search = req.body
            const list = await ObjsService.getAllTabels(search)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async getTabelsForAll(req,res,next) {
        try{
            const search = req.body
            const list = await ObjsService.getTabelsForAll(search)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async createTabels(req,res,next) {
        try{
            const tabel = req.body
            const list = await ObjsService.createTabels(tabel)

            await HistoryService.createAction(req.user.id,8,`Создание табеля для обьекта id:${tabel.getId} Месяц:${tabel.selMonth} year:${tabel.selYear}`)
            return res.status(200).json(list)

        }catch (e){
            next(e)
        }
    }
    async showObjs(req,res,next) {
        try{
            const list = await ObjsService.showObjects({inn:req.user.inn,user_id:req.user.id})
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async insertObjs(req,res,next) {
        try{
            const {obj_id} = req.body
            const list = await ObjsService.insertObjects(obj_id,req.user.login,req.user.id,req.user.inn)
            await HistoryService.createAction(req.user.id,8,`Добавление обьектов ${obj_id}`)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async getT13(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.getT13(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async listTabelMans(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.listTabelMans(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async getKTUdate(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.getKTUdate(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async copyTab(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.copyTab(params)
            await HistoryService.createAction(req.user.id,8,`Копирование табеля ${params.shifrname} ${params.month} ${params.year}`)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async delManTabel(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.delManTabel(params)
            await HistoryService.createAction(req.user.id,8,`Удаление сотрудника из табеля - ${params.man}`)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async getUsersList(req,res,next) {
        try{
            const list = await ObjsService.getUsersList()
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async passObj(req,res,next) {
        try{
            const params = req.body
            params.papa = req.user.id
            const list = await ObjsService.passObj(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
    async dataOfObj(req,res,next) {
        try{
            const params = req.body
            const list = await ObjsService.dataOfObj(params)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async getPriory(req,res,next) {
        try{
            const list = await ObjsService.getPriory()
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }

    async getTabelSRTO(req,res,next) {
        try{
            const objs = req.body
            const list = await ObjsService.getTabelSRTO(objs)
            await HistoryService.createAction(req.user.id,7,`Загрузка СРТО`)
            return res.status(200).json(list)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new ObjsController()