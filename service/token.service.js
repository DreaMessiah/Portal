const jwt = require('jsonwebtoken')
const config = require('config')
const {Token} = require('../models/models')
const HistoryService = require("./history.service")

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, config.get('jwtAccessSecret'),{expiresIn:'1d'})
        const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'),{expiresIn:'30d'})
        return {accessToken,refreshToken}
    }
    generateTnToken(payload){
        const tnToken = jwt.sign(payload, config.get('jwtDeviceSecret'),{expiresIn:'1m'})
        return tnToken
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
    async removeToken(refreshToken){
        const token =  await Token.findOne({ where: {refresh_token: refreshToken} })
        if(token){
            await HistoryService.createAction(token.user_id,2,`Выход из портала`)
        }
        return await token.destroy()
    }
    async findToken(refreshToken){
        return await Token.findOne({ where: {refresh_token: refreshToken} })
    }
    validateAccessToken(token){
        try{
            return jwt.verify(token, config.get('jwtAccessSecret'))
        }catch (e){
            return null
        }
    }
    validateRefreshToken(token){
        try{
            return jwt.verify(token, config.get('jwtRefreshSecret'))
        }catch (e){
            return null
        }
    }

}
module.exports = new TokenService()