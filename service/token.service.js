const jwt = require('jsonwebtoken')
const config = require('config')
const {Token} = require('../models/models')

class TokenService{
    generateTokens(payload){
        console.log('++++++++++++++'+payload)
        console.log('=============='+config.get('jwtRefreshSecret'))
        const accessToken = jwt.sign(payload, config.get('jwtAccessSecret'),{expiresIn:'30m'})
        const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'),{expiresIn:'30d'})
        console.log('------------------------------- '+refreshToken)
        return {accessToken,refreshToken}
    }
    // Доработать ЛОГИКУ работы с deviceToken!!!!!!!!!!!!!!!!!!!!!
    async saveToken(userId,refreshToken,deviceToken){
        const tokenData = await Token.findOne({ where: {user_id:userId} })
        if(tokenData) {
            tokenData.refresh_token = refreshToken
            return await tokenData.save()
        }
        return await Token.create({user_id:userId,device_token:deviceToken,refresh_token:refreshToken})
    }
}
module.exports = new TokenService()