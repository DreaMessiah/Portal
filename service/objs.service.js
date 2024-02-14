const {Objects, ObjectsSV, YmSvarka} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class ObjsService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}, order: [['shifr', 'ASC']]})
        return listObjs
    }

}
module.exports = new ObjsService()