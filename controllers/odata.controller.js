const odataService = require('../service/odata.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
class OdataController {
    async getpeoples(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при чтени списка людей из 1С',errors.array()))
            const peoples = await odataService.getpeoples()
            const data = await odataService.getdata()

            let combinedPeoples = peoples.value.map(obj1 => {
                let matchingObj = data.value.find(obj2 => obj2.Сотрудник_Key === obj1.Ref_Key)

                if(!matchingObj) console.log(obj1)

                if (matchingObj && matchingObj.ДатаУвольнения === '0001-01-01T00:00:00' && matchingObj.ОформленПоТрудовомуДоговору) {
                    return {
                        ...obj1,
                        ...matchingObj
                    }
                }

            }).filter(Boolean)

            return res.status(200).json(combinedPeoples)
        }catch (e){
            next(e)
        }
    }
}
module.exports = new OdataController()