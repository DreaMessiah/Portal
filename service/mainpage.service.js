

const {BestBoard} = require('../models/models')
const {DataTypes} = require("sequelize");
const {method} = require("../middleware/odata.middleware");
class BestManService{
    async pushBestMan(man) {
            try{
                const created = await BestBoard.create({name:man.name,developer:man.developer,onboard:man.onboard,dev:man.dev,inn:man.inn})
                return {created, message}
            } catch {
                'пшол нахуй'
            }

    }

}

module.exports = new BestManService()