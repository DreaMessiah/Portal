const odataService = require('../service/odata.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
class OdataController {
    async getpeoples(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при чтени списка людей из 1С',errors.array()))
            const peoples = await odataService.getpeoples()
            //const uvol = await odataService.getuvol()
            //console.log(uvol)
            //
            // peoples.value.map(async (item,index) =>  {
            //     const check = await this.checkPeople(item.Ref_Key)
            //     console.log(check)
            //     if(check.ДатаУвольнения === '0001-01-01T00:00:00'){
            //         data[index] = { ...item, ...check }
            //     }
            // })
            //


            return res.status(200).json(peoples)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new OdataController()