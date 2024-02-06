const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const WeldingService = require("../service/welding.service");
class WeldingController {
    async getListObjs(req,res,next) {
         try{
            const inn = req.body.inn
             const list = await WeldingService.getObjects(inn)
             console.log(list)
            return res.json(list)

        }catch (e){
            console.log(e.message)
            next(e)
        }
    }
}

module.exports = new WeldingController()