const {TableTabel, Tasks,Priority, Objects, User, TaskGroups, TaskConnections, TaskChains, TaskDocs, Files, DiskSpace, OgmPrice, Ymshifr} = require('../models/models')
const ApiError = require('../exceptions/api.error')
const FilesService = require('./files.service')
const config = require("config");
const fs = require("fs");
const FileDto = require("../dtos/fileDto");

class TabelService{

    async myObj(id) {
        const line = await Objects.findOne({where:{id:id.id}})
        return line
    }

    async plusMan(man) {
        return await TableTabel.create({
            name: man.man.name,
            developer: man.man.developer,
            branch: man.man.branch,
            object_id: man.man.objid,
            shifr: man.man.shifr,
            month: man.man.month,
            year: man.man.year,
            ktu: '1',
            marker: 0,
            ras: '',
            company_id: 1,
            inn: man.man.inn,
            transport: '',
            price: '',
            tn: man.man.tn,
            m1: '', m2: '', m3: '', m4: '',m5: '',m6: '',m7: '',m8: '',m9: '',m10: '',m11: '',m12: '',m13: '',m14: '',m15: '',m16: '',m17: '',m18: '',m19: '',m20: '',m21: '',m22: '',m23: '',m24: '',m25: '',m26: '',m27: '',m28: '',m29: '',m30: '',m31: '',
            c1: '',c2: '',c3: '',c4: '',c5: '',c6: '',c7: '',c8: '',c9: '',c10: '',c11: '',c12: '',c13: '',c14: '',c15: '',c16: '',c17: '',c18: '',c19: '',c20: '',c21: '',c22: '',c23: '',c24: '',c25: '',c26: '',c27: '',c28: '',c29: '',c30: '',c31: '',
            dop1: '',dop2: '',dop3: '',dop4: '',dop5: '',dop6: '',dop7: '',dop8: '',dop9: '',dop10: '',dop11: '',dop12: '',dop13: '',dop14: '',dop15: '',dop16: '',dop17: '',dop18: '',dop19: '',dop20: '',dop21: '',dop22: '',dop23: '',dop24: '',dop25: '',dop26: '',dop27: '',dop28: '',dop29: '',dop30: '',dop31: ''
        })
    }

    async editDay(day) {
        const line = await TableTabel.findOne({where:{id:day.idline}})
        line[day.day] = day.val
        await line.save();
        return ''
    }

    async getTransport(inn) {
        const line = await OgmPrice.findAll()
        return line
    }

    async getThisTabel(params) {
        try{
            const line = await Ymshifr.findOne({where: {object_id: params.object_id, month: params.month, year:params.year}})
            return line
        }catch{
            return 'error'
        }

    }

    async blockedTabel(params) {
        try{
            const line = await Ymshifr.findOne({where: {object_id: params.object_id, month: params.month, year:params.year}})
            line.auto = 1
            await line.save();
            return line
        }catch{
            return 'error'
        }

    }

    async getItogy(params) {
        try{
            console.log(params)
            console.log(' - ')
            console.log(' - ')
            console.log(' - ')
            console.log("это сервис на сервере")
            // const line = await Ymshifr.findOne({where: {object_id: params.object_id, month: params.month, year:params.year}})
            // line.auto = 1
            // await line.save();
            return ''
        }catch{
            return 'error'
        }

    }

}

module.exports = new TabelService()
