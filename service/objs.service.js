const {Objects, NumberObjects} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
class ObjsService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}, order: [['shifr', 'ASC']]})
        return listObjs
    }
    async showObjects(user){
        const newArr = []
        const newList = []
        const listObjs = await NumberObjects.findAll({where: {inn:user.inn, login:user.login}, order: [['id', 'DESC']]})
        const allObjs = await Objects.findAll({where: {inn:user.inn}, order: [['shifr', 'ASC']]})

            listObjs.forEach(obj=>{
                const newObj = {}
                allObjs.forEach(strock => {

                    if(strock.id === obj.object_id){
                        newObj.id = strock.id
                        newObj.shifr = strock.shifr
                        newObj.nameobject = strock.nameobject
                        newObj.ogm_j = strock.ogm_j
                        newObj.prior = strock.prior
                        newObj.ras = strock.ras
                        newObj.dop1 = strock.dop1
                        newObj.dop2 = strock.dop2
                        newList.push(newObj)
                    }
                })

            })



        // const allObjs = await Objects.findAll({where: {inn:inn}, order: [['shifr', 'ASC']]})
        //


        return newList
    }
    async insertObjects(obj){
        console.log(obj)
        const obj_id = +obj.idobj
        await NumberObjects.create({object_id:obj_id,nameobject:'',user_id:0,papa:obj.login,inn:obj.inn,login:obj.login})
        const listObjs = await NumberObjects.findAll({where: {inn:obj.inn, login:obj.login}, order: [['id', 'DESC']]})
        return listObjs
    }


}
module.exports = new ObjsService()