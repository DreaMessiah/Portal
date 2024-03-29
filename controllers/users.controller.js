const userService = require('../service/users.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const sharp = require('sharp')
const FilesService = require("../service/files.service")
const config = require("config")
const fs = require("fs")
const {Avatar, T13, User} = require("../models/models");
const sequelize = require("sequelize");
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
            const refreshToken = req.cookies['refreshToken']
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch (e){
            next(e)
        }
    }
    async refresh(req,res,next) {
        try{
            const refreshToken = req.cookies['refreshToken']
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async get(req,res,next){
        try{
            const usersData = await userService.get()
            return res.status(200).json(usersData)
        }catch (e){
            next(e)
        }
    }
    async setAvatar(req,res,next){
        try{
            const file = req.files.file

            const newname = FilesService.generateRandomFileName()

            const type = file.name.split('.').pop()

            const path = `${config.get('public_path')}profile\\${newname}.${type}`
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)
            await FilesService.compressResizeAndSaveImage(path,80, 300, 400)
            const avatar = `${newname}.${type}`

            await User.update({ avatar: avatar }, { where: { id: req.user.id } });

            return res.status(200).json({path:avatar})

        }catch (e){
            next(e)
        }
    }


}

module.exports = new UsersController()