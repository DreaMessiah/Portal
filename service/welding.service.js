const {Objects, ObjectsSV, YmSvarka, CrewBase, CrewSv, TabelSv, CrewManlist, TableTabel, ViewsWorkSv, ZaSv,
    TableZayavka, KtuList
} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class WeldingService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}})
        return listObjs
    }
    async getCrew(){
        const listCrew = await CrewBase.findAll()
        return listCrew
    }
    async getMyCrews(params){
        const listMyCrews = await CrewSv.findAll({where: {shifr:params.shifr}})
        return listMyCrews
    }
    async createCrew(params){
        const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
        console.log('===== TYT ====')
        console.log(params)
    // { sel: 'Бр. Изомов Х. Ш.', month: '1', year: '2024', idobj: '88' }
        const getobj = await Objects.findAll({where: {id:params.idobj}})
        const shifrname = getobj[0].dataValues.shifr
        const namemonth = months[params.monther]

        const listMyCrews = await TabelSv.findAll({where: {shifr:shifrname, year:params.year, month:namemonth, checkin:'man', crew:params.sel}})
        console.log('что нашел')
        console.log(listMyCrews)
        // for(let i=0; i<1273; i++){
        //     try{
        //         const createds = await TabelSv.create({object_id:null,shifr:'',year:'',month:'',
        //             crew:'',checkin:'man',name:'',developer:'',tn:'',inn:'8617014209',
        //             volume:'',unit:'',norma:''})
        //         console.log(createds)
        //     } catch(e) {
        //         console.log(e)
        //     }
        // }


        if(listMyCrews.length === 0){
            console.log('Делаем create')
            const getDevSV = await CrewManlist.findAll({where: {crew:params.sel}})
            getDevSV.forEach( man=>{
                console.log(man.dataValues)
                const str = man.dataValues.maninfo
                const arr = str.split('|');
                const fio = arr[0]
                const dev = arr[1]
                const tn = arr[3]


                const created = TabelSv.create({object_id:params.idobj,shifr:shifrname,year:params.year,month:namemonth,
                    crew:params.sel,checkin:'man',name:fio,developer:dev,tn:tn,inn:'8617014209',
                    volume:'',unit:'',norma:'',writed:0,d1:0,d2:0,d3:0,d4:0,d5:0,d6:0,d7:0,d8:0,d9:0,d10:0,d11:0,d12:0,d13:0,d14:0,d15:0,d16:0,d17:0,d18:0,d19:0,d20:0,d21:0,d22:0,d23:0,d24:0,d25:0,d26:0,d27:0,d28:0,d29:0,d30:0,d31:0})
                // const created = await TabelSv.create({object_id:params.idobj,shifr:shifrname,year:params.year,month:namemonth,
                //     crew:params.sel,checkin:'man',name:fio,developer:dev,tn:tn,inn:'8617014209',
                //     volume:'',unit:'',norma:'',writed:0,d1:0,d2:0,d3:0,d4:0,d5:0,d6:0,d7:0,d8:0,d9:0,d10:0,d11:0,d12:0,d13:0,d14:0,d15:0,d16:0,d17:0,d18:0,d19:0,d20:0,d21:0,d22:0,d23:0,d24:0,d25:0,d26:0,d27:0,d28:0,d29:0,d30:0,d31:0})

            })
            // const listMyCrews = await CrewSv.findAll({where: {shifr:shifrname}})
            // return listMyCrews
            // const mess = 'Звено: ' + params.sel + ' добавлено'
            // return {mess}
        } else {
            console.log('Не нашел')
            console.log(params)
            console.log(namemonth)
            // return 'Не добавлено, звено: ' + params.sel + ' уже сущуствует'
        }

        // return listMyCrews
    }
    async getTabelSv(params){
        const listTabelSV = await TabelSv.findAll({where: {shifr:params.shifr, year:params.getYear, month:params.month}})
        return listTabelSV
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
        // TabelSv
        // console.log("это сервис на сервере")
        // const line = await TableTabel.findOne({where:{id:day.idline}})
        // line[day.day] = day.val
        // await line.save();
        // return ''

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

        // const listMyCrews = await TabelSv.findAll({where: {shifr:shifrname, year:params.year, month:namemonth, checkin:'man', crew:params.sel}})
        // const line = await TabelSv.findOne({where:{id:param.manid}})
        // line[param.day] = param.value
        // await line.save();
        // return ''
        // TabelSv
        // console.log("это сервис на сервере")
        // const line = await TableTabel.findOne({where:{id:day.idline}})
        // line[day.day] = day.val
        // await line.save();
        return created

    }
    async getObgForHook(id){
        const thisid = +id
        const thisObj = await Objects.findOne({where: {id:thisid}})
        return thisObj
    }
    async createZa(year,month,object_id,user_tn){
        const za = await ZaSv.create({year,month,object_id,author_tn:user_tn,status_id:30})
        if(!za) return {err:true,message:'Заявка не создана'}
        return za
    }
    async createConnections(connections,za_id){
        return await Promise.all( connections.map(async item => {return await TableZayavka.create({...item,zasv_id:za_id})}))
    }

}
module.exports = new WeldingService()