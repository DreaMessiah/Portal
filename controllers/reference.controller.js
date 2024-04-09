const ReferenceService = require('../service/reference.service')
class ReferenceController {
    async getWorks(req,res,next) {
        try{
            const {inn} = req.user
            const works = await ReferenceService.getWorks(inn)
            return res.status(200).json(works)
        }catch (e){
            next(e)
        }
    }
    async getOgm(req,res,next) {
        try{
            const {inn} = req.user
            const ogm = await ReferenceService.getOgm(inn)
            return res.status(200).json(ogm)
        }catch (e){
            next(e)
        }
    }
    async saveWorks(req,res,next) {
        try{
            const {worksPrice} = req.body
            await worksPrice.map( async item => {
                await ReferenceService.saveWorksPrice(item)
            })
            const price = await ReferenceService.getWorks(req.user.inn)
            return res.status(200).json(price)
        }catch (e){
            next(e)
        }
    }
    async saveOgm(req,res,next) {
        try{
            const {ogmPrice} = req.body
            await ogmPrice.map( async item => {
                await ReferenceService.saveOgmPrice(item)
            })
            const ogm = await ReferenceService.getOgm(req.user.inn)
            return res.status(200).json(ogm)
        }catch (e){
            next(e)
        }
    }
    async createWorks(req,res,next) {
        try{
            const {work} = req.body
            console.log(work)
            const newPrice = ReferenceService.createWork(work)
            return res.status(200).json(newPrice)
        }catch (e){
            next(e)
        }
    }
    async createOgm(req,res,next) {
        try{
            const {ogm} = req.body
            const newOgm = ReferenceService.createOgm(ogm)
            return res.status(200).json(newOgm)
        }catch (e){
            next(e)
        }
    }
    async deleteWorks(req,res,next) {
        try{
            const {id} = req.body
            const delWork = await ReferenceService.deleteWorks(id)
            if(delWork.id === id) return res.status(200).json({del:true})
            return res.status(200).json({del:false})
        }catch (e){
            next(e)
        }
    }
    async deleteOgm(req,res,next) {
        try{
            const {id} = req.body
            const delOgm = await ReferenceService.deleteOgm(id)
            if(delOgm.id === id) return res.status(200).json({del:true})
            return res.status(200).json({del:false})
        }catch (e){
            next(e)
        }
    }
    async loadWorks(req,res,next) {
        try{
            const {works} = req.body
            const worksData = await ReferenceService.loadWorks(works,req.user.inn)
            return res.status(200).json(worksData)
        }catch (e){
            next(e)
        }
    }
    async loadOgm(req,res,next) {
        try{
            const {ogms} = req.body
            const ogmsData = await ReferenceService.loadOgms(ogms,req.user.inn)
            return res.status(200).json(ogmsData)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new ReferenceController()