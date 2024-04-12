const {Objects, NumberObjects, Ymshifr, T13, TableTabel} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
const {DataTypes} = require("sequelize");
class ObjsService{
    async getObjects(inn){
        const listObjs = await Objects.findAll({where: {inn:inn}, order: [['shifr', 'ASC']]})
        return listObjs
    }

    async getAllTabels(search){
        console.log(search)
        const listObjs = await Ymshifr.findAll({where: {object_id:search.getId, inn:search.inn}, order: [['year', 'DESC']]})
        return listObjs
    }

    async createTabels(tabel){
        console.log(tabel)
        const idobj = parseInt(tabel.getId)
        await Ymshifr.create({object_id:idobj, shifr:idobj, month:tabel.selMonth, year:tabel.selYear, inn:tabel.inn})
        const list = await Ymshifr.findAll({where: {object_id:tabel.getId, inn:tabel.inn}, order: [['year', 'DESC']]})
        return list
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

    async getT13(params){
        const listMan = await T13.findAll({where: {inn:params.inn, month:params.month, year:params.year}, order: [['name', 'ASC']]})
        return listMan
    }

    async listTabelMans(params){
        const listTabel = await TableTabel.findAll({where: {inn:params.inn, object_id:params.shifre, month:params.month, year:params.year}, order: [['name', 'ASC']]})
        return listTabel
    }



}
module.exports = new ObjsService()