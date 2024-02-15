const ApiError = require('../exceptions/api.error')
const {User,T13} = require("../models/models");
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
}
module.exports = new T13Service()