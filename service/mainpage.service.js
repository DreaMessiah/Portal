const {BestBoard} = require('../models/models')
class BestManService{
    async delBestMan(id) {
        return await BestBoard.destroy({where: {id: id.id}})
    }
    async viewBestMan(inn) {
        return await BestBoard.findAll({where: {inn:inn.inn}})
    }
    async pushBestMan(man) {
        return await BestBoard.create({name:man.bestman.name,tn:man.bestman.tn,developer:man.bestman.developer,onboard:man.bestman.onboard,dev:man.bestman.dev,inn:man.bestman.inn})
    }
}

module.exports = new BestManService()