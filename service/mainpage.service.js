

const {BestBoard, T13} = require('../models/models')
const {DataTypes} = require("sequelize");
const {method} = require("../middleware/odata.middleware");
class BestManService{

    async delBestMan(id) {
        try{
            console.log('перед удалением')
            console.log(id)
            // const created = await BestBoard.findAll({where: {inn:inn.inn}})
            const deleted = await BestBoard.destroy({where: {id: id.id}})
            return deleted
        } catch {
            'пшол нахуй'
        }

    }

    async viewBestMan(inn) {
        try{
            const created = await BestBoard.findAll({where: {inn:inn.inn}})
            return created
        } catch {
            'пшол нахуй'
        }

    }

    async pushBestMan(man) {
            try{
                let best = man.bestman
                const created = await BestBoard.create({name:best.name,tn:best.tn,developer:best.developer,onboard:best.onboard,dev:best.dev,inn:best.inn})
                return {created, message}
            } catch {
                'пшол нахуй'
            }

    }

}

module.exports = new BestManService()