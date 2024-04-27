const ApiError = require('../exceptions/api.error')
const {User,T13, T13Uni, HumanList, KtuDoc, PeopleCounter, Token} = require("../models/models");
const T13Dto = require("../dtos/t13Dto");
const sequelize = require("sequelize");

class AutomakerService {
    async recordLoginCount() {
        try{

            const today = new Date()
            const numreg = await User.count({
                where: sequelize.literal("DATE(\"createdAt\") = DATE(NOW() - INTERVAL '1 HOUR')"),
            });
            console.log('123')
            const numinp = await Token.count({
                where: {
                    updatedAt: {
                        [sequelize.Op.gte]: sequelize.literal("NOW() - INTERVAL '24 HOUR'"), // Больше или равно вчерашней дате
                        [sequelize.Op.lt]: sequelize.literal("NOW()"), // Меньше сегодняшней даты
                    },
                },
            });
            const numall = await Token.count();

            await PeopleCounter.create({date: sequelize.literal('CURRENT_DATE - INTERVAL \'6 HOUR\''),numinp,numreg,numall})
        }catch (e) {
            console.log(e)
        }
    }


}
module.exports = new AutomakerService()