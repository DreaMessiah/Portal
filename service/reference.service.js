 const {OgmPrice,WorkPrice, T13, KtuDoc, KtuList, T13Uni, Payslip} = require('../models/models')
 const T13Dto = require("../dtos/t13Dto");


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
    async changeMonthT13(t13,inn){
        const old = await T13.findAll({where:{inn:inn,month:t13[0].month,year:t13[0].year}})
        if(!old) return {message:'Ошибка очистки'}
        old.map(async item => await item.destroy())
        const olduni = await T13Uni.findAll()
        if(!olduni) return {message:'Ошибка очистки'}
        olduni.map(async item => await item.destroy())
        let existingItem = []
        const T13new = await Promise.all( t13.map(async item => {
            if(!existingItem.includes(item.tn)) {
                try {
                    await T13Uni.create(new T13Dto(item)).then(() => {
                        existingItem.push(item.tn)
                    })
                } catch (error) {
                    console.log(existingItem + ' Повторяющийся тип')
                }
            }
            return await T13.create(item)
        }))
        await T13.create({name:'Служба Поддержки',developer:'Служба поддержки',branch:'Служба поддержки',onboard:'08.08.2022',tn:'999999999',month:t13[0].month,year:t13[0].year,inn:inn,birthday:'13.04.1965'})
        await T13Uni.create({name:'Служба Поддержки',developer:'Служба поддержки',branch:'Служба поддержки',onboard:'08.08.2022',tn:'999999999',month:t13[0].month,year:t13[0].year,inn:inn,birthday:'13.04.1965'})
        return T13new
    }
    async changeMonthPayslip(payslip,inn){
        const old = await Payslip.findAll({where:{inn:inn,month:payslip[0].month,year:payslip[0].year+'',type:payslip[0].type}})
        if(!old) return {message:'Ошибка очистки'}
        old.map(async item => await item.destroy())
        return await Promise.all( payslip.map(async item => { return await Payslip.create(item) }))
    }

    async getKtuDocs(inn){
        const ktudocs = await KtuDoc.findAll({where:{inn:inn,trash:false}})
        if(!ktudocs) return {message:'Документы отсутствуют'}
        return ktudocs
    }
    async deleteKtuDocs(id){
        const ktudoc = await KtuDoc.findByPk(id)
        if(!ktudoc) return {message:'Документы отсутствуют'}
        ktudoc.trash = true
        await ktudoc.save()
        return {del:true,message:'Запись удалена'}
    }
    async newKtuDoc(month,year,user_tn,inn,comment=''){
        const searchktu = await KtuDoc.findOne({where:{month:month,year:year,inn:inn}})
        if(!searchktu){
            return await KtuDoc.create({inn,month,year,author:user_tn,comment,trash:false})
        }else{
            if(searchktu.trash) {
                searchktu.trash = false
                await searchktu.save()
                return searchktu
            }
            return {err:true,message:'Документ уже существует'}
        }
    }

    async saveKtus(id,ktus){
        const searchktu = await KtuList.findAll({where:{ktudoc_id:id}})
        if(searchktu){
            searchktu.map(async item => await item.destroy())
        }
        return await Promise.all( ktus.map(async item => {return await KtuList.create({ktudate:item.ktudate,shifr:item.shifr,content:item.content,ktuman:item.from_tn,ktudoc_id:id,user_tn:item.user_tn,ktu:item.ktu})}))
    }
    async getKtus(id){
        const ktus = await KtuList.findAll({where:{ktudoc_id:id}})
        if(!ktus) return {message:'Документы отсутствуют'}
        return ktus
    }

}
module.exports = new ReferenceService()