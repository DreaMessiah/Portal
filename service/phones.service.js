const {Phonebook} = require('../models/models')
const PhonesDto = require('../dtos/phonesDto')
const ApiError = require('../exceptions/api.error')
class PhonesService{
    async get() {
        const book = await Phonebook.findAll({order:[['order', 'ASC']]})
        if(!book) throw ApiError.BadRequest('База с контактами пуста')
        //const phonesDto = new PhonesDto(book)
        console.log(book)
        return book
    }
    async add(name,mobile_phone,city_phone,ats,email,position,job,order,heading = false) {
        const book = await Phonebook.create({name,mobile_phone,city_phone,ats,email,position,job,order,heading})
        const phonesDto = new PhonesDto(book)
        return {phones: phonesDto}
    }
}
module.exports = new PhonesService()