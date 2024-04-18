const ApiError = require('../exceptions/api.error')
const {User,T13, T13Uni, HumanList} = require("../models/models");
const T13Dto = require("../dtos/t13Dto");

class T13Service {
    async get(userid) {
        const user = await User.findOne({ where:{id:userid} })
        if(!user) throw ApiError.BadRequest(`Пользователь ${userid} не верифицирован для получения данных Т13`)
        const t13 = await T13.findOne({ where:{name:user.full_name}, order: [['id', 'DESC']]})
        const t13Dto = new T13Dto(t13)
        return {t13:t13Dto}
    }
    async getMonthForUser(tn,month,year) {
        const t13 = await T13.findOne({ where:{tn:tn,month:month,year:year}})
        return t13
    }
    async getActual(inn) {
        const lastOne = await T13.findOne({order: [['createdAt', 'DESC']]})
        const t13 = await T13.findAll({where:{month:lastOne.dataValues.month,year:lastOne.dataValues.year,inn:inn}})
        const T13forSelect = t13.map( item => {
            return {...item.dataValues,value:item.dataValues.tn,label:item.dataValues.name}
        })
        return T13forSelect
    }
    async getWorkers(inn){
        const t13 = await T13Uni.findAll({where:{inn:inn}})
        const hu = await HumanList.findAll()
        const workers = [...t13,...hu]
        return workers.map(item => {
            return {...item.dataValues,value:item.dataValues.tn,label:item.dataValues.name}
        })
    }
}
module.exports = new T13Service()