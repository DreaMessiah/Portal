const {User, DiskSpace, T13Uni, PeopleCounter, Token, Answer, Bye, Preregister, T13Black, T13Bye} = require('../models/models')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/usersDto')
const T13UniDto = require('../dtos/t13UniDto')
const tokenService = require('../service/token.service')
const T13Service = require('../service/t13.service')
const ApiError = require('../exceptions/api.error')
const sequelize = require("sequelize");
const {where} = require("sequelize");
const HistoryService = require("./history.service");
class UsersService{
    async registration(tn,full_name,login,email,password,inn) {
        const candidate = await User.findOne({where: {login:login}})
        if(candidate) throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`)
        const hashPassword = await bcrypt.hash(password,15)
        const user = await User.create({tn,full_name,login,email,password:hashPassword,inn,unit:0})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens,user: userDto}
    }
    async createuser(tn,full_name,login,email,password,inn,developer) {
        const candidate = await User.findOne({where: {login:login}})
        if(candidate) throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`)
        const hashPassword = await bcrypt.hash(password,15)
        const user = await User.create({tn,full_name,login,email,password:hashPassword,inn,unit:0,developer})
        const uni = await T13Uni.findOne({ where:{tn:tn} })
        const t13UniDto = new T13UniDto(uni)
        const userDto = new UserDto(user)
        return {user: userDto,uni:t13UniDto}
    }
    async login(login,password) {
        const user = await User.findOne({ where:{login:login} })
        if(!user){
            await HistoryService.createAction(-1,1,`Попытка входа. Пользователя с таким именем не существует ${login}`,1)
            throw ApiError.BadRequest('Пользователя с таким именем не существует')
        }
        const isPassEquals = await bcrypt.compare(password,user.password)
        if(!isPassEquals){
            await HistoryService.createAction(user.id,1,`Неверный пароль`,1)
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        let sizes = await DiskSpace.findOne({where:{user_id:userDto.id}})
        if(!sizes){
            sizes = await DiskSpace.create({user_id:userDto.id,usedspace:0,diskspace:10737418240});
        }
        userDto.diskspace = sizes.diskspace
        userDto.usedspace = sizes.usedspace
        await HistoryService.createAction(user.id,1,`Успешная авторизация`,0)
        return {...tokens,user: userDto}
    }
    async setfz152(tn) {
        const user = await User.findOne({ where:{tn:tn} })
        if(!user) throw ApiError.BadRequest('Ошибка сервера, пройдите регистрацию снова')
        user.checked = true
        await user.save()
        await HistoryService.createAction(user.id,1,`Согласие с ФЗ-152`,0)
        return {user:new UserDto(user)}
    }
    async tnenter(tn) {
        const user = await User.findOne({ where:{tn:tn} })
        if(user){
            await HistoryService.createAction(-1,1,`Пользователь с таким табельным номером уже существует ${tn}`,1)
            throw ApiError.BadRequest('Пользователь с таким табельным номером уже существует')
        }
        const uni = await T13Uni.findOne({ where:{tn:tn} })
        if(!uni){
            await HistoryService.createAction(-1,1,`Табельный номер не зарегестрирован в системе ${tn}`,1)
            throw ApiError.BadRequest('Табельный номер не зарегестрирован в системе')
        }
        const t13UniDto = new T13UniDto(uni)
        return {uni: t13UniDto}
    }
    async changePassword(id,oldPass,newPass){
        const user = await User.findOne({where: {id:id}})
        if(!user) return {err:true,message:'Пользователя с таким именем не существует'}
        const isPassEquals = await bcrypt.compare(oldPass,user.password)
        if(!isPassEquals) return {err:true,message:'Неверный пароль'}
        user.password = await bcrypt.hash(newPass,15)
        await user.save()
        await HistoryService.createAction(id,1,`Изменение пароля`,0)
        return {err:false,message:'Пароль успешно изменен'}
    }
    async logout(refreshToken){
        return await tokenService.removeToken(refreshToken)
    }
    async refresh(refreshToken){
        if(!refreshToken) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
        const user = await User.findOne({ where:{id:userData.id} })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        let sizes = await DiskSpace.findOne({where:{user_id:userDto.id}})
        if(!sizes){
            sizes = await DiskSpace.create({user_id:userDto.id,usedspace:0,diskspace:10737418240});
        }
        userDto.diskspace = sizes.diskspace
        userDto.usedspace = sizes.usedspace

        const survey = await Answer.findOne({where:{user_id:userDto.id,survey_id:10}})

        const hrmcheck = await T13Service.checkHrm(userDto.tn)

        return {...tokens,user: userDto,survey:!!survey,hrmcheck:hrmcheck}
    }
    async get() {
        //const users = await User.findAll({order: [['id', 'ASC']], limit: 30})
        const Users = await User.findAll({order: [['full_name', 'ASC']]})
        if(!Users) throw ApiError.BadRequest('Ошибка получения списка пользователей')
        const users = Users.map( item => {
            return {...item.dataValues,value:item.dataValues.id,label:item.dataValues.full_name}
        })
        return {users}
    }
    async bye(termText,selected,tn) {
        const user = await T13Uni.findOne({where: {tn:tn}})
        if(!user) throw ApiError.BadRequest('Ошибка получения пользователя')
        return await Bye.create({user_tn:tn,term:user.term,text:termText,num:selected})
    }
    async checkBye(tn){
        const isBye = await Bye.findOne({where:{user_tn:tn}})
        return !!isBye
    }
    async getUserByTn(tn) {
        let user = await T13Uni.findOne({where:{tn:tn}})
        if(!user){
            user = await T13Bye.findOne({where:{tn:tn}})
            if(!user) return {err:true,message:'Пользователь не найден'}
        }
        return {user}
    }
    async getstat() {
        const numall = await User.count()
        const stat = await PeopleCounter.findAll()

        const numreg = await User.count({
            where: sequelize.literal("DATE(\"createdAt\") = CURRENT_DATE")
        })
        const numinp = await Token.count({
            where: sequelize.literal("DATE(\"updatedAt\") = CURRENT_DATE")
        })
        const date = new Date()
        return {numall:numall,stat:[...stat,{id:-1,date,numreg,numall,numinp}]}
    }
    async getusers(sort='full_name') {
        const users = await User.findAll({order: [[sort, 'ASC']]})
        if(!users) throw ApiError.BadRequest('Ошибка получения списка пользователей')
        return {users}
    }
    async getSizes(id) {
        const user = await User.findByPk(id)
        if(!user) throw ApiError.BadRequest('Ошибка получения списка пользователей')
        return user.snils
    }
    async setSizes(sizes,id) {
        const user = await User.findByPk(id)
        if(!user) throw ApiError.BadRequest('Ошибка получения списка пользователей')
        user.snils = sizes
        await user.save()
        return user
    }
    async createPreReg(user) {
        const reg = await Preregister.create(user)
        if(!reg) throw ApiError.BadRequest('Ошибка создания регистрации')
        const t13 = await T13Uni.findOne({where:{name:user.name}})
        if(t13) reg.tn = t13.tn
        return reg
    }
    async changeZa(user) {
        let reg = await Preregister.findByPk(user.id)
        if(!reg) throw ApiError.BadRequest('Ошибка изменения заявки')
        await reg.destroy()
        reg = await Preregister.create(user)
        const t13 = await T13Uni.findOne({where:{name:user.name}})
        if(t13) reg.tn = t13.tn
        return reg
    }
    async removeZa(id) {
        const za = await Preregister.findByPk(id)
        if(!za) throw ApiError.BadRequest('Ошибка удаления заявки')
        await za.destroy()
        return true
    }
    async getPrereg() {
        const list = await Preregister.findAll()
        return await Promise.all( list.map( async item => {
            const t13 = await T13Uni.findOne({where:{name:item.name}})
            return t13 ? {...item.dataValues,tn:t13.tn} : item
        }))
    }
    async FixRegister(full_name,login,email,password,phone,avatar) {
        const t13 = await T13Uni.findOne({where:{name:full_name}})
        if(!t13) throw ApiError.BadRequest('Ошибка регистрации - пользователь не найден(Поиск по имени)')
        const candidate = await User.findOne({where: {login:login}})
        if(candidate) throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`)
        const hashPassword = await bcrypt.hash(password,15)
        console.log(password)
        console.log(hashPassword)
        const newuser = await User.create({tn:t13.tn,full_name,login,email,password:hashPassword,inn:8617014209,unit:0,phone,avatar,developer:t13.developer})
        if(newuser) {//full_name,login,email,password,phone,avatar
            const reg = await Preregister.findOne({where:{name:full_name}})
            if(reg) await reg.destroy()
        }
        return newuser
    }
    async getUnphoto() {
        const unphoto = await User.findAll({where:{avatar:null}})
        const t13 = await T13Bye.findAll()
        const key = 'tn';
        let set = []

        const data = unphoto.map( item => {
            return {...item.dataValues,value:item.dataValues.tn,label:item.dataValues.full_name}
        })
        data.map( item => {
            const exists = t13.some(obj => obj[key] === item.value)
            if(!exists) set.push(item)
        })
        return set
    }
    async setFixAva(worker,avatar){
        const user = await User.findByPk(worker.id)
        user.avatar = avatar
        await user.save()
        return user
    }



}
module.exports = new UsersService()