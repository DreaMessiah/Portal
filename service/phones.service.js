const {Phonebook,Managers} = require('../models/models')
const PhonesDto = require('../dtos/phonesDto')
const ApiError = require('../exceptions/api.error')
class PhonesService{
    async get() {
        const book = await Phonebook.findAll({order:[['order', 'ASC']]})
        if(!book) throw ApiError.BadRequest('База с контактами пуста')
        return book
    }
    async add(name,mobile_phone,city_phone,ats,email,position,job,order,heading = false) {
        const book = await Phonebook.create({name,mobile_phone,city_phone,ats,email,position,job,order,heading})
        const phonesDto = new PhonesDto(book)
        return {phones: phonesDto}
    }
    async getmanagers() {
        return await Managers.findAll()
    }

    async change(id,name,mobile_phone,city_phone,ats,email,position,job,order) {
        const contact = await Phonebook.findByPk(id)
        if(!contact) throw ApiError.BadRequest('Контакт не найден')
        contact.name = name
        contact.mobile_phone = mobile_phone
        contact.city_phone = city_phone
        contact.ats = ats
        contact.email = email
        contact.position = position
        contact.job = job
        contact.order = order
        await contact.save()
        await this.update()
        return contact
    }
    async delete(id){
        const contact = await Phonebook.findByPk(id)
        if(!contact) throw ApiError.BadRequest('Контакт не найден, ошибка удаления')
        await contact.destroy();
        await this.update()
        return {message:'Запись удалена'}
    }
    async update(){
        const rows = await this.get()
        await Promise.all(rows.map(async (row,index) => {
            await Phonebook.update({ order: index + 1 }, { where: { id: row.id } });
        }))
    }
}
module.exports = new PhonesService()