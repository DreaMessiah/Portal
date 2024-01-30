const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/usersDto')
const tokenService = require('../service/token.service')
class UsersService{
    async registration(tn,full_name,login,email,password,inn) {
        const candidate = await User.findOne({where: {login:login}})
        if(candidate) throw new Error ('Пользователь с таким логином уже существует')
        const hashPassword = await bcrypt.hash(password,15)
        const user = await User.create({tn,full_name,login,email,password:hashPassword,inn})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! "+tokens.refreshToken)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }
    async login(login,password) {

    }
}
module.exports = new UsersService()