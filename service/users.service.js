const {User, DiskSpace} = require('../models/models')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/usersDto')
const tokenService = require('../service/token.service')
const ApiError = require('../exceptions/api.error')
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
        //console.log(await bcrypt.hash(password,15))
        return {...tokens,user: userDto}
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
        //console.log(userData)
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

        return {...tokens,user: userDto}
    }

    async get() {
        //const users = await User.findAll({order: [['id', 'ASC']], limit: 30})
        const users = await User.findAll({order: [['full_name', 'ASC']]})
        if(!users) throw ApiError.BadRequest('Ошибка получения списка пользователей')
        return {users}
    }
}
module.exports = new UsersService()