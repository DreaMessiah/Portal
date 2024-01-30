const userService = require('../service/users.service')
const {User} = require("../models/models");
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
class UsersController {
    async registration(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            const {tn,full_name,login,email,password,inn} = req.body
            const userData = await userService.registration(tn,full_name,login,email,password,inn)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }

    async login(req,res,next) {
        try{
            const {login,password} = req.body
            const userData = await userService.login(login,password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async logout(req,res,next) {
        try{
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch (e){
            next(e)
        }
    }
    async refresh(req,res,next) {
        try{
            const refreshToken = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new UsersController()