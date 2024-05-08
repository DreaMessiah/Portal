const ApiError = require('../exceptions/api.error')
const {User,T13, T13Uni, HumanList, Answer} = require("../models/models");
const T13Dto = require("../dtos/t13Dto");

const { sequelize } = require("../models/models")
const {Sequelize,Op} = require("sequelize");
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
    async getUni(inn) {
        return await T13Uni.findAll({where:{inn:inn}})
    }
    async getBranchs() {
        const branches = await T13Uni.findAll({
            attributes: ['branch'],
            group: ['branch']
        })
        const users = await User.findAll()
        const resultList = []
        for (const branch of branches) {
            const branchName = branch.branch
            const branchEmployees = await T13Uni.findAll({
                where: { branch: branchName }
            })
            const validEmployees = branchEmployees.filter(employee =>
                users.some(user => user.tn === employee.tn)
            )
            if (validEmployees.length > 0) {
                const employeesWithUsers = validEmployees.map(employee => {
                    const user = users.find(user => user.tn === employee.tn)
                    return {
                        ...employee.toJSON(),
                        createdUser: user.createdAt
                    }
                })
                resultList.push({
                    branch: branchName,
                    tns: employeesWithUsers
                })
            }
        }

        return resultList
    }

}
module.exports = new T13Service()