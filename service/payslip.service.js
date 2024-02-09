//const {Phonebook} = require('../models/models')

const ApiError = require('../exceptions/api.error')
class PayslipService {
    async get() {
        //const book = await Phonebook.findAll({order:[['order', 'ASC']]})
        //if(!book) throw ApiError.BadRequest('База с контактами пуста')
        //const phonesDto = new PhonesDto(book)
        //console.log(book)
        return
    }

}
module.exports = new PayslipService()