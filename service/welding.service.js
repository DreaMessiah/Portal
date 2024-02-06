const {Objects} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class WeldingService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}})

        // const listDto = new ObjsDto(listObjs)
        // const req = listObjs.map(obj => Object(obj[0]))
        //console.log(listObjs)
        return listObjs
    }

}
module.exports = new WeldingService()