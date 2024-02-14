const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const ObjsService = require("../service/objs.service");
class ObjsController {
    async getListObjs(req,res,next) {
         try{
             console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            const inn = req.body.inn
             console.log('')
             console.log('')
             console.log('')
             console.log('')
             console.log(req.body)
             console.log('')
             console.log('')
             console.log(inn)
             console.log('')
             console.log('')
             console.log('')
             console.log('')
             console.log('')
             const list = await ObjsService.getObjects(inn)
            return res.json(list)

        }catch (e){
            next(e)
        }
    }


}
module.exports = new ObjsController()