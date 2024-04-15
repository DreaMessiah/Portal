const WeldingService = require("../service/welding.service");
const {TableZayavka, User, Objects, Statuses} = require("../models/models");
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
            const params = req.body
            const list = await WeldingService.getMyCrews(params)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }
    async createCrew(req,res,next) {
        try{
            const params = req.body
            const list = await WeldingService.createCrew(params)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }
    async getTabelSv(req,res,next) {
        try{
            const params = req.body
            const list = await WeldingService.getTabelSv(params)
            return res.json(list)
        }catch (e){
            next(e)
        }
    }
    async updateManDays(req,res,next) {
        try{
            const params = req.body
            const list = await WeldingService.updateManDays(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }
    async getViewWorkSV(req,res,next) {
        try{
            const params = req.body
            const list = await WeldingService.getViewWorkSV(params)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }
    async plusVW(req,res,next) {
        try{
            const params = req.body
            const list = await WeldingService.plusVW(params)
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
            const list = await WeldingService.getObgForHook(id)
            return res.json(list.dataValues)
        }catch (e){
            next(e)
        }
    }
    async createZa(req,res,next) {
        try{
            const {connections,year,month,object_id} = req.body
            const za = await WeldingService.createZa(year,month,object_id,req.user.tn)
            if(!za.err) {
                const cs = await WeldingService.createConnections(connections, za.id)
                return res.status(200).json([za, cs])
            }
            return res.status(500).json({err:true,message:''})
        }catch (e){
            next(e)
        }
    }
    async getZasv(req,res,next) {
        try{
            const {year,month,object_id} = req.body
            const zas = await WeldingService.getZasv(year,month,object_id)
            if(!zas.err) {
                const zasvs = await Promise.all( zas.map(async item => {
                    const user = await User.findOne({where:{tn:item.author_tn}})
                    const obj = await Objects.findOne({where:{id:+item.object_id}})
                    const stat = await Statuses.findOne({where:{id:+item.status_id}})
                    const conn = await TableZayavka.findAll({where:{zasv_id:+item.id}})
                    return await {...item.dataValues,author_name:user.full_name,object_shift:obj.shifr,status_name:stat.label,status_back:stat.background,status_color:stat.color,total:conn.length}
                }))
                return res.status(200).json(zasvs)
            }
            return res.status(500).json({err:true,message:'Ошибка получения данных'})
        }catch (e){
            next(e)
        }
    }
    async getStatuses(req,res,next) {
        try{
            const {type,unit} = req.body
            const sts = await WeldingService.getStatuses(type,unit)
            return res.status(200).json(sts)
        }catch (e){
            next(e)
        }
    }
    async changeStat(req,res,next) {
        try{
            const {za_id,stat_id} = req.body
            const sts = await WeldingService.changeStat(za_id,stat_id)
            return res.status(200).json(sts)
        }catch (e){
            next(e)
        }
    }
    async deleteZa(req,res,next) {
        try{
            const {za_id} = req.body
            const za = await WeldingService.deleteZa(za_id)
            return res.status(200).json(za)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new WeldingController()