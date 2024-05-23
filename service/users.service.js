const {User, DiskSpace, T13Uni, PeopleCounter, Token, Answer, Bye} = require('../models/models')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/usersDto')
const T13UniDto = require('../dtos/t13UniDto')
const tokenService = require('../service/token.service')
const T13Service = require('../service/t13.service')
const ApiError = require('../exceptions/api.error')
const sequelize = require("sequelize");
const {where} = require("sequelize");
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
        if(!user) throw ApiError.BadRequest('Пользователя с таким именем не существует')
        const isPassEquals = await bcrypt.compare(password,user.password)
        if(!isPassEquals) throw ApiError.BadRequest('Неверный пароль')
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        let sizes = await DiskSpace.findOne({where:{user_id:userDto.id}})
        if(!sizes){
            sizes = await DiskSpace.create({user_id:userDto.id,usedspace:0,diskspace:10737418240});
        }
        userDto.diskspace = sizes.diskspace
        userDto.usedspace = sizes.usedspace
        return {...tokens,user: userDto}
    }

    async setfz152(tn) {
        const user = await User.findOne({ where:{tn:tn} })
        if(!user) throw ApiError.BadRequest('Ошибка сервера, пройдите регистрацию снова')
        user.checked = true
        await user.save()
        return {user:new UserDto(user)}
    }
    async tnenter(tn) {
        const user = await User.findOne({ where:{tn:tn} })
        if(user) throw ApiError.BadRequest('Пользователь с таким табельным номером уже существует')
        const uni = await T13Uni.findOne({ where:{tn:tn} })
        if(!uni) throw ApiError.BadRequest('Табельный номер не зарегестрирован в системе')
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
        const users = await User.findAll({order: [['full_name', 'ASC']]})
        if(!users) throw ApiError.BadRequest('Ошибка получения списка пользователей')
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
        const user = await T13Uni.findOne({where:{tn:tn}})
        if(!user) return {err:true,message:'Пользователь не найден'}
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


}
module.exports = new UsersService()