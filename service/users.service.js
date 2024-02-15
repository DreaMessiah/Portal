const {User} = require('../models/models')
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
        //console.log(await bcrypt.hash(password,15))
        return {...tokens,user: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
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

        return {...tokens,user: userDto}
    }
}
module.exports = new UsersService()