const {Objects, NumberObjects} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class ObjsService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}, order: [['shifr', 'ASC']]})
        return listObjs
    }
    async showObjects(user){
        const listObjs = await NumberObjects.findAll({where: {inn:user.inn, login:user.login}, order: [['id', 'DESC']]})
        return listObjs
    }
    async insertObjects(obj){
        await NumberObjects.create({shifr:obj.idobj,nameobject:'',user_id:0,papa:obj.login,inn:obj.inn,login:obj.login})
        const listObjs = await NumberObjects.findAll({where: {inn:obj.inn, login:obj.login}, order: [['id', 'DESC']]})
        return listObjs
    }


}
module.exports = new ObjsService()