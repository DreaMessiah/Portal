const {Objects, ObjectsSV, YmSvarka, CrewBase, CrewSv, TabelSv, CrewManlist, TableTabel, ViewsWorkSv, ZaSv,
    TableZayavka, KtuList, Statuses, KtuDoc, CrewMans, T13Uni, HumanList, T13, Payslip
} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
const WelmanDto = require("../dtos/welmanDto");
const T13Dto = require("../dtos/t13Dto");
class WeldingService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}})
        return listObjs
    }
    async getCrew(){
        const listCrew = await CrewBase.findAll()
        return listCrew
    }
    async createNewCrew(crew){
        const newCrew = await CrewBase.create(crew)
        return newCrew
    }
    async createNewCrewGroup(id,group){
        if(group.length){
            await group.map(async item => {
                await CrewMans.create({crew_id:id,user_tn:item.tn,inn:item.inn})
            })
        }
        return true
    }
    async getMyCrews(params){
        const thisobj = params.object_id
        const listMyCrews = await CrewSv.findAll({where: {object_id: thisobj}})
        const newarr = []
        let thiscrew = {}
        let i = 0
        listMyCrews.forEach(crew => {
            thiscrew = crew
            thiscrew.dataValues.label = thiscrew.namecrew
            thiscrew.dataValues.value = thiscrew.id
            thiscrew.dataValues.index = i
            i++
            newarr.push(thiscrew)
        })


        return newarr
    }
    async createCrew(params){
        // console.log('Это ПАРАМЕТРЫ ДЛЯ ДОБАВЛЕНИЯ КОМАНДЫ')
        // console.log(params)
        const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
        // console.log('===== TYT ====')
        // console.log(params)
    // { sel: 'Бр. Изомов Х. Ш.', month: '1', year: '2024', idobj: '88' }
        const getobj = await Objects.findAll({where: {id:params.idobj}})
        const shifrname = getobj[0].dataValues.shifr
        const namemonth = months[params.monther]
        const thisobj = +params.idobj
        const listMyCrews = await TabelSv.findAll({where: {object_id: thisobj, year:params.year, month:namemonth, checkin:'man', crew:params.crew.namecrew}})
        // console.log('что нашел')
        // console.log(listMyCrews)

        if(listMyCrews.length === 0){
            // console.log('Делаем create')
            // console.log(params.crew.crew_id)
            const getDevSV = await CrewMans.findAll({where:{crew_id:params.crew.crew_id},
                include: [
                    { model: T13Uni, attributes: ['name','developer','tn'] },
                    { model: HumanList, attributes: ['name','developer','tn'] }
                ]
            })
            getDevSV.forEach(crew => {
                const human = crew.dataValues.humanlist
                const t13man = crew.dataValues.t13uni
                let man
                if(human === null){
                    man = t13man
                } else {
                    man = human
                }
                const created = TabelSv.create({object_id:thisobj,shifr:shifrname,year:params.year,month:namemonth,
                    crew:params.crew.namecrew, checkin:'man',name:man.name,developer:man.developer,tn:man.tn,inn:'8617014209',
                    volume:'',unit:'',norma:'',writed:0,d1:0,d2:0,d3:0,d4:0,d5:0,d6:0,d7:0,d8:0,d9:0,d10:0,d11:0,d12:0,d13:0,d14:0,d15:0,d16:0,d17:0,d18:0,d19:0,d20:0,d21:0,d22:0,d23:0,d24:0,d25:0,d26:0,d27:0,d28:0,d29:0,d30:0,d31:0})

            })

        } else {
            // console.log('Не нашел')
            // console.log(params)
            // console.log(namemonth)
            // return 'Не добавлено, звено: ' + params.sel + ' уже сущуствует'
        }

        return listMyCrews
    }
    async getTabelSv(params){
        const listTabelSV = await TabelSv.findAll({where: {shifr:params.shifr, year:params.getYear, month:params.month}})
        const newarr = []
        for (const sv of listTabelSV) {

            const thisis = sv
            let allfact = 0

            const thisview = await TabelSv.findAll({where: {checkin: 'view', shifr:params.shifr, name:thisis.name}})

            if(thisview !== 0){
                thisview.forEach(item => {

                    allfact = allfact + item.dataValues.d1 + item.dataValues.d2 + item.dataValues.d3 + item.dataValues.d4 + item.dataValues.d5 + item.dataValues.d6 + item.dataValues.d7 + item.dataValues.d8 + item.dataValues.d9 + item.dataValues.d10 + item.dataValues.d11 + item.dataValues.d12 + item.dataValues.d13 + item.dataValues.d14 + item.dataValues.d15 + item.dataValues.d16 + item.dataValues.d17 + item.dataValues.d18 + item.dataValues.d19 + item.dataValues.d20 + item.dataValues.d21 + item.dataValues.d22 + item.dataValues.d23 + item.dataValues.d24 + item.dataValues.d25 + item.dataValues.d26 + item.dataValues.d27 + item.dataValues.d28 + item.dataValues.d29 + item.dataValues.d30 + item.dataValues.d31
                })
            }
            thisis.dataValues.allfact = allfact
            newarr.push(thisis)
        }
        return newarr
    }
    async viewObjSV(params){


        const listObjs = await ObjectsSV.findAll({where: {inn:params.inn, user:params.login}})
        return listObjs
    }
    async pushObj(obj){

        const searchObj = await ObjectsSV.findOne({ where: {shifrid:obj.myObj.id, inn:obj.myObj.inn} })

        let message = {};
        if(searchObj) {

            message = {message: 'объект уже в работе'}
            return {searchObj, message}
        } else {
        console.log('смотри')
            message = {message: 'объект добавлен'}

            const created = await ObjectsSV.create({shifr:obj.myObj.shifr,nameobject:obj.myObj.nameobject,user:obj.user,papa:obj.user,inn:obj.myObj.inn,login:obj.user,shifrid:obj.myObj.id})

            return {created, message}
        }

    }
    async getYM(innId){
        const listYM = await YmSvarka.findAll({where: {inn:innId.inn, shifr:innId.idstore}, order: [['year', 'DESC'],['month', 'ASC']]})
        return listYM
    }
    async getViewWorkSV(params){
        console.log('params')
        console.log(params)
        const getobj = await Objects.findOne({where: {id:params.idshifr}})
        const shifr = getobj.dataValues.shifr
        console.log('объект')
        console.log(shifr)
        // const shifrname = getobj[0].dataValues.shifr
        const listWorks = await ViewsWorkSv.findAll({where: {shifr:shifr}})
        return listWorks
    }
    async crYM(params){
        const listYM = await YmSvarka.findAll({where: {inn:params.inn, shifr:params.idstore, year:params.newyear, month:params.newmonth}, order: [['year', 'DESC'],['month', 'ASC']]})

        if(listYM.length < 1){
            const created = await YmSvarka.create({indicator:'0',shifr:params.idstore,year:params.newyear,month:params.newmonth,inn:params.inn})
            const message = {message: 'Табель добавлен'}
            return {created, message}
        } else {
            return 'error'
        }



    }
    async updateManDays(param){
        console.log(param)
        console.log(' - ')
        console.log(' - ')
        console.log(' - ')
        const line = await TabelSv.findOne({where:{id:param.manid}})
        line[param.day] = param.value
        await line.save();
        return ''

    }
    async plusVW(param){
        const created = await TabelSv.create({
            object_id: param.objid,
            shifr: param.thisView.shifr,
            year: param.year,
            month: param.month,
            crew: param.crew,
            checkin: 'view',
            name: param.thisView.viewname,
            developer: '',
            tn: '',
            inn: '8617014209',
            volume: '',
            unit: '',
            norma: '',
            writed: 0,
            d1: 0,
            d2: 0,
            d3: 0,
            d4: 0,
            d5: 0,
            d6: 0,
            d7: 0,
            d8: 0,
            d9: 0,
            d10: 0,
            d11: 0,
            d12: 0,
            d13: 0,
            d14: 0,
            d15: 0,
            d16: 0,
            d17: 0,
            d18: 0,
            d19: 0,
            d20: 0,
            d21: 0,
            d22: 0,
            d23: 0,
            d24: 0,
            d25: 0,
            d26: 0,
            d27: 0,
            d28: 0,
            d29: 0,
            d30: 0,
            d31: 0,
            p1: 0,
            p2: 0,
            p3: 0,
            p4: 0,
            p5: 0,
            p6: 0,
            p7: 0,
            p8: 0,
            p9: 0,
            p10: 0,
            p11: 0,
            p12: 0,
            p13: 0,
            p14: 0,
            p15: 0,
            p16: 0,
            p17: 0,
            p18: 0,
            p19: 0,
            p20: 0,
            p21: 0,
            p22: 0,
            p23: 0,
            p24: 0,
            p25: 0,
            p26: 0,
            p27: 0,
            p28: 0,
            p29: 0,
            p30: 0,
            p31: 0,
        })


        return created

    }
    async getObgForHook(id){
        const thisid = +id
        const thisObj = await Objects.findOne({where: {id:thisid}})
        return thisObj
    }
    async createZa(year,month,object_id,user_tn){
        const za = await ZaSv.create({year,month,object_id,author_tn:user_tn,status_id:30,trash:false})
        console.log(za)
        if(!za) return {err:true,message:'Заявка не создана'}
        return za
    }
    async createConnections(connections,za_id){
        return await Promise.all( connections.map(async item => {return await TableZayavka.create({...item,zasv_id:za_id})}))
    }
    async getZasv(year,month,object_id){
        const zasv = await ZaSv.findAll({where:{year:year,month:month,object_id:object_id,trash:false},order:[['id', 'DESC']]})
        if(!zasv) return {message:'Документы отсутствуют'}
        return zasv
    }
    async getStatuses(type,unit){
        const sts = await Statuses.findAll({where:{type:type,unit:unit}})
        if(!sts) return {message:'Статусы отсутствуют'}
        return sts
    }
    async changeStat(za_id,stat_id){
        const za = await ZaSv.findByPk(za_id)
        if(!za) return {message:'Заявука отсутствует'}
        za.status_id = stat_id
        await za.save()
        return za
    }
    async deleteZa(za_id){
        const za = await ZaSv.findByPk(za_id)
        if(!za) return {message:'Документы отсутствуют'}
        za.trash = true
        await za.save()
        return {del:true,message:'Запись удалена'}
    }
    async getConn(za_id){
        const connections = await TableZayavka.findAll({where:{zasv_id:+za_id}})
        if(!connections) return {message:'Стыки отсутствуют'}
        return connections
    }
    async saveConn(connections){
        const changes = await Promise.all(connections.map( async item => {
            const con = await TableZayavka.findByPk(item.id)
            return await con.update(item)
        }))
        if(!changes) return {message:'Ошибка обновления'}
        return changes
    }
    async addMan(man){
        const newMan = new WelmanDto({...man})
        return await TabelSv.create(newMan)
    }
    async deleteMan(id){
        const deleted = await TabelSv.findByPk(id)
        if(deleted){
            await deleted.destroy()
            return {del:true,message:'Работник удален из списка'}
        }
        return {del:false,message:'Проблема удаления'}
    }
    async loadMansToCrew(id){
        const list = await CrewMans.findAll({where:{crew_id:id},
            include: [
                { model: T13Uni, attributes: ['name','developer','tn'] },
                { model: HumanList, attributes: ['name','developer','tn'] }
            ]
        })
        if(!list) return {err:true,message:'Люди привязанные к данной бригаде отсутствуют'}
        return list
    }
    async loadCrewData(id){
        const crew = await CrewBase.findByPk(id)
        return crew
    }
    async saveCrewMans(id,group){
        const crew = await CrewBase.findByPk(id)
        if(crew){
            const mans = await CrewMans.findAll({where:{crew_id:id}})
            mans.map(async item => await item.destroy())
            if(group.length){
                await group.map(async item => {
                    await CrewMans.create({crew_id:id,user_tn:item.tn,inn:item.inn})
                })
                return true
            }
        }
        return false
    }
    async getCrewForObject(param){
        try{
            const list = await CrewSv.findAll({where: {object_id: param.object_id}, order: [['createdAt', 'DESC']]})
            return list
        }catch(e){
            console.log(e)
        }
    }
    async delCrewForObject(param){
        try{
            const deleted = await CrewSv.findByPk(param.idcrew)
            if(deleted){
                await deleted.destroy()
                return {del:true,message:'Звено удалено из списка'}
            }
            return {del:false,message:'Проблема удаления'}
        }catch(e){
            console.log(e)
        }
    }
    async plusCrewOnObj(crew){

        const thisobj = +crew.object_id
        const thiscrew = crew.crew
        const search = await CrewSv.findAll({where: {object_id: thisobj, crew_id: thiscrew.id}})
        if(search.length === 0){
            const created = await CrewSv.create({
                shifr: '',
                namecrew: thiscrew.crewname,
                compound: 0,
                pointer: 1,
                inn: '8617014209',
                object_id: thisobj,
                crew_id: thiscrew.id
            })
            return true
        }else{
            return false
        }

    }
    async summFactDays(object){
        console.log(object)
    }

    async changeShifrWorkTypes(types){
        const old = await ViewsWorkSv.findAll({where:{inn:types[0].inn,shifr:types[0].shifr}})
        if(!old) return {message:'Ошибка очистки'}
        old.map(async item => await item.destroy())
        console.log()
        return await Promise.all( types.map(async item => { return await ViewsWorkSv.create(item) }))
    }
    async createViewWork(thisview){
        return await ViewsWorkSv.create({
            shifr: thisview.shifr,
            viewname: thisview.viewname,
            volume: thisview.volume,
            unit: thisview.unit,
            norma: thisview.norma,
            inn: '8617014209'
        })
    }
}

module.exports = new WeldingService()