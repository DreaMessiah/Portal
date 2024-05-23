const ApiError = require('../exceptions/api.error')
const {User,T13, T13Uni, HumanList, Answer, Struct, StructUsers, Reports, Phonebook, T13Black, Bye, T13Bye} = require("../models/models");
const T13Dto = require("../dtos/t13Dto");

const { sequelize } = require("../models/models")
const {Sequelize,Op,where} = require("sequelize")

class T13Service {
    async get(userid) {
        const user = await User.findOne({ where:{id:userid} })
        if(!user) throw ApiError.BadRequest(`Пользователь ${userid} не верифицирован для получения данных Т13`)
        const t13 = await T13.findOne({ where:{name:user.full_name}, order: [['id', 'DESC']]})
        const t13Dto = new T13Dto(t13)
        return {t13:t13Dto}
    }
    async getMonthForUser(tn,month,year) {
        const t13 = await T13.findOne({ where:{tn:tn,month:month,year:year}})
        return t13
    }
    async getActual(inn) {
        const lastOne = await T13.findOne({order: [['createdAt', 'DESC']]})
        const t13 = await T13.findAll({where:{month:lastOne.dataValues.month,year:lastOne.dataValues.year,inn:inn}})
        const T13forSelect = t13.map( item => {
            return {...item.dataValues,value:item.dataValues.tn,label:item.dataValues.name}
        })
        return T13forSelect
    }
    async getWorkers(inn){
        const t13 = await T13Uni.findAll({where:{inn:inn}})
        const hu = await HumanList.findAll()
        const workers = [...t13,...hu]
        return workers.map(item => {
            return {...item.dataValues,value:item.dataValues.tn,label:item.dataValues.name}
        })
    }
    async getUni(inn) {
        return await T13Uni.findAll({where:{inn:inn}})
    }
    async getBranchs() {
        const branches = await T13Uni.findAll({
            attributes: ['branch'],
            group: ['branch']
        })
        const users = await User.findAll()
        const resultList = []
        for (const branch of branches) {
            const branchName = branch.branch
            const branchEmployees = await T13Uni.findAll({
                where: { branch: branchName }
            })
            const validEmployees = branchEmployees.filter(employee =>
                users.some(user => user.tn === employee.tn)
            )
            if (validEmployees.length > 0) {
                const employeesWithUsers = validEmployees.map(employee => {
                    const user = users.find(user => user.tn === employee.tn)
                    return {
                        ...employee.toJSON(),
                        createdUser: user.createdAt
                    }
                })
                resultList.push({
                    branch: branchName,
                    tns: employeesWithUsers
                })
            }
        }

        return resultList
    }

    async getStructure() {
        const structs = await Struct.findAll( { include: 'structusers' })
        return structs.map(item => {
            return {...item.dataValues,value:item.dataValues.id,label:item.dataValues.name}
        })
    }
    async createStructure(struct) {
        if(!!struct.id){
            const current = await Struct.findByPk(struct.id)
            if(!current) return {error:true,message:'Структура не найдена'}
            current.name = struct.name
            await StructUsers.destroy({ where: { structure_id: struct.id } });
            const peoples = struct.group.map(async item => {
                await StructUsers.create({name:item.name,structure_id:struct.id,user_tn:item.tn})
            })
            current.set('factbranchs', struct.t13brs)
            await current.save()
            return {current,peoples,}
        }else{
            const allIn = await Struct.findByPk(struct.toNext.id)
            const newStruct = await Struct.create({...struct,level:struct.toNext.level+1,position:allIn.next.length+1,type:struct.onType ? 1 : 0,ont13:struct.onT13})
            const peoples = struct.group.map(async item => {
                await StructUsers.create({name:item.name,structure_id:newStruct.id,user_tn:item.tn})
            })
            const prev = await Struct.findByPk(struct.toNext.id)
            prev.set('next', [...prev.next, newStruct.id]) //// prev.set('next', prev.next.filter(value => value !== 1)) //даление элемента 1 из массива
            await prev.save()
            return {newStruct,peoples}
        }
    }
    async getWorkersBranch(branch) {
        const brs = await Struct.findByPk(branch)
        const blacklistedTns = await T13Black.findAll({attributes: ['tn']})
        const blacklistedTnValues = blacklistedTns.map(record => record.tn);
        if(!brs) return {error:true,message:'Ветвь не найдена'}
        return await T13Uni.findAll({where:{branch:brs.dataValues.factbranchs,tn: {[Op.notIn]: blacklistedTnValues }}})
    }
    async deleteBranch(id) {
        const del = await Struct.findByPk(id)
        const peoples = await StructUsers.findAll({where:{structure_id:id}})
        peoples.map(async item => await item.destroy())
        await del.destroy()
        const fromNext = await Struct.findOne({where:{next:{[Op.contains]: [id]}}})
        if(fromNext){
            console.log(id)
            fromNext.set('next',fromNext.next.filter(element => element !== id))
            console.log(fromNext.next)
            await fromNext.save()
        }
        return fromNext
    }

    async changeContact(worker,onContacts,contacts) {
        const su = await StructUsers.findByPk(worker)
        if(!su) return {error:true,message:'Сотрудник не найден'}
        su.onphonebook = onContacts
        su.contacts = contacts
        await su.save()
        return su
    }
    async sendHrm(tn,report){
        return await Reports.create({user_tn:tn,report:report})
    }
    async checkHrm(tn){
        return await Reports.findOne({where:{user_tn:tn}})
    }
    async getHrmAnswers(){
        return await Reports.findAll({ include: 't13uni' })
    }
    async getContacts(name){
        const contact = await Phonebook.findOne({where:{name:name}})
        if(!contact) return {err:true,message:'Контакт не найден'}
        let text = ''

        if(contact.mobile_phone.length) text = text + 'Мобильный номер телефона : ' + contact.mobile_phone + '\n'
        if(contact.city_phone.length) text = text + 'Городской номер телефона : ' + contact.city_phone + '\n'
        if(contact.ats.length) text = text + 'Номер АТС : ' + contact.ats + '\n'
        if(contact.email.length) text = text + 'EMail адрес : ' + contact.email + '\n'

        return text
    }
    async changeBlack(list){
        const black = await T13Black.findAll()
        black.map(async item => {
            await item.destroy()
        })
        return await Promise.all( list.map( async item => {
            return await T13Black.create({name:item.name,tn:item.tn})
        }))
    }
    async getBlack(){
        const black = await T13Black.findAll( { include: 't13uni' })
        return black.map(item => {
            return {...item.dataValues,value:item.dataValues.tn,label:item.dataValues.name}
        })
    }
    async getByeAnswers(){
        return await Bye.findAll( { include: 't13bye' })
    }
    async getTerm(){
        return await T13Bye.findAll()
    }
    async getNewUsers(){
        const users = await T13Uni.findAll()
        const dateNew = new Date('2024-05-01')
        const newUsers = []
        users.map( item => {
            const dateOnboard = new Date(item.onboard.split('.').reverse().join('-'));
            if(dateNew<=dateOnboard) newUsers.push(item)
        })

        return newUsers

    }


}
module.exports = new T13Service()