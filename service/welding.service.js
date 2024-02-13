const {Objects, ObjectsSV, YmSvarka} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class WeldingService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}}) //взять все строки

        //  await Objects.    - взять модель таблицы из которой будем выгружать значения (т.е. определяем из какой таблицы берем)
        //  where: {inn:inn}  - прописываем условия
        return listObjs
    }

    async viewObjSV(params){


        const listObjs = await ObjectsSV.findAll({where: {inn:params.inn, user:params.login}}) //взять все строки

        //  await Objects.    - взять модель таблицы из которой будем выгружать значения (т.е. определяем из какой таблицы берем)
        //  where: {inn:inn}  - прописываем условия
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

    async getObgForHook(id){
        const thisObj = await Objects.findOne({where: {id:id}})

        console.log('"')
        console.log('"')
        console.log('"')
        console.log('"')
        console.log('"')
        console.log('ВОТ это в сервисе БЭК')
        console.log('"')
        console.log(thisObj)
        console.log('"')
        console.log('"')
        console.log('"')
        console.log('"')
        console.log('"')


        return thisObj
    }


}
module.exports = new WeldingService()