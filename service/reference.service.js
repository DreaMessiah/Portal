const {OgmPrice,WorkPrice} = require('../models/models')
const ApiError = require('../exceptions/api.error')
const TabelDto = require("../dtos/tabelDto");
const { Op } = require('sequelize');
const sequelize = require("sequelize");

class ReferenceService {
    async getWorks(inn) {
        const workPrice = await WorkPrice.findAll({where:{inn:inn},order: [['id', 'ASC']]})
        if(!workPrice) return {message:'Записи не найдены'}
        return workPrice
    }
    async getOgm(inn) {
        const ogmPrice = await OgmPrice.findAll({where:{inn:inn},order: [['id', 'ASC']]})
        if(!ogmPrice) return {message:'Записи не найдены'}
        return ogmPrice
    }
    async deleteWorks(id) {
        const worksPrice = await WorkPrice.findByPk(id)
        if (worksPrice) {
            await worksPrice.destroy()
            return worksPrice
        } else {
            return false
        }
    }
    async deleteOgm(id) {
        const ogmPrice = await OgmPrice.findByPk(id)
        if (ogmPrice) {
            await ogmPrice.destroy()
            return ogmPrice
        } else {
            return false
        }
    }
    async saveOgmPrice(row) {
        const ogmPrice = await OgmPrice.findByPk(row.id)
        if (ogmPrice) {
            ogmPrice.price = row.price
            ogmPrice.group = row.group
            ogmPrice.prefix = row.prefix
            await ogmPrice.save()
            return ogmPrice
        } else {
            return false
        }
    }
    async saveWorksPrice(row) {
        const workPrice = await WorkPrice.findByPk(row.id)
        if (workPrice) {
            workPrice.tariff = row.tariff
            workPrice.price = row.price
            workPrice.positions = row.positions
            workPrice.comment = row.comment
            workPrice.prefix = row.prefix
            await workPrice.save()
            return workPrice
        } else {
            return false
        }
    }
    async createOgm(ogm) {
        const ogmPrice = await OgmPrice.create(ogm)
        if (ogmPrice) {
            return ogmPrice
        } else {
            return false
        }
    }
    async createWork(work) {
        const ogmPrice = await WorkPrice.create(work)
        if (ogmPrice) {
            return ogmPrice
        } else {
            return false
        }
    }
    async loadOgms(ogms,inn){
        const old = await OgmPrice.findAll({where:{inn:inn}})
        if(!old) return {message:'Ошибка очистки'}
        old.map(async item => await item.destroy())
        return await Promise.all( ogms.map(async item => {return await OgmPrice.create({...item,inn:inn})}))
    }
    async loadWorks(works,inn){
        const old = await WorkPrice.findAll({where:{inn:inn}})
        if(!old) return {message:'Ошибка очистки'}
        old.map(async item => await item.destroy())
        return await Promise.all( works.map(async item => {return await WorkPrice.create({...item,inn:inn})}))
    }
}
module.exports = new ReferenceService()