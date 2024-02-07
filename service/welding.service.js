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

    // async pushObj(obj, inn, user){
    //     const searchObj = await ObjectsSV.findOne({ where: {shifrid:obj.id, inn:obj.inn} })
    //     if(searchObj) {
    //
    //     } else {
    //         return await ObjectsSV.create({shifr:obj.shifr,shifrid:obj.id,nameobject:ren,user:ren,papa:ren,burn:ren,inn:inn,login:user})
    //     }
    //
    // }



}
module.exports = new WeldingService()