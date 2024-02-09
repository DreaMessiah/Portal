const {Objects, ObjectsSV} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class WeldingService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}}) //взять все строки

        //  await Objects.    - взять модель таблицы из которой будем выгружать значения (т.е. определяем из какой таблицы берем)
        //  where: {inn:inn}  - прописываем условия
        return listObjs
    }

    async pushObj(obj){
        console.log(obj.myObj.id)
        const searchObj = await ObjectsSV.findOne({ where: {shifrid:obj.myObj.id, inn:obj.myObj.inn} })
        console.log("obj.myObj.id!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let message = {};
        if(searchObj) {
            console.log('такой уже есть!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            message = {message: 'объект уже в работе'}
            return {searchObj, message}
        } else {
        console.log('смотри')
            message = {message: 'объект добавлен'}
            console.log('Write...............')
            const created = await ObjectsSV.create({shifr:obj.myObj.shifr,nameobject:obj.myObj.nameobject,user:obj.user,papa:obj.user,inn:obj.myObj.inn,login:obj.user,shifrid:obj.myObj.id})
            console.log(created)
            return {created, message}
        }

    }



}
module.exports = new WeldingService()