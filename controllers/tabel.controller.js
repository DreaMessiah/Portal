
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const TabelService = require("../service/tabel.service");
class TabelController {
    async plusMan(req,res,next) {
        try{
            const man = req.body
            const list = await TabelService.plusMan(man)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }

    async editDay(req,res,next) {
        try{
            const day = req.body
            const list = await TabelService.editDay(day)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }


}
// pushObjWelding
module.exports = new TabelController()