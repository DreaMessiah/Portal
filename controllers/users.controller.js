const userService = require('../service/users.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const sharp = require('sharp')
const FilesService = require("../service/files.service")
const config = require("config")
const fs = require("fs")
const {Avatar, T13, User} = require("../models/models");
const sequelize = require("sequelize");
const PATH = require("path");
const authMiddlewere = require("../middleware/auth.middleware");
const HistoryService = require("../service/history.service");

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
    async createuser(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            else{
                const {tn,full_name,login,password,developer} = req.body
                const userData = await userService.createuser(tn,full_name,login,'new@new.ru',password,'8617014209',developer)
                FilesService.createPathUser(userData.user.id)
                await HistoryService.createAction(req.user.id,1,`Регистрация по табельному номеру ${tn} ${full_name}`)
                return res.json(userData)
            }
        }catch (e){
            next(e)
        }
    }
    async login(req,res,next) {
        try{
            const {login,password} = req.body
            const userData = await userService.login(login,password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            //await HistoryService.createAction(,9,`Успешний вход в систему`)
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async setfz152(req,res,next) {
        try{
            const {tn} = req.body
            const fz = await userService.setfz152(tn)

            return res.json(fz)
        }catch (e) {
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
    async tnenter(req,res,next) {
        try{
            const {tn} = req.body
            const tnData = await userService.tnenter(tn)
            return res.json(tnData)
        }catch (e){
            next(e)
        }
    }
    async changePassword(req,res,next) {
        try{
            const {oldPass,newPass} = req.body
            const result = await userService.changePassword(req.user.id,oldPass,newPass)
            await HistoryService.createAction(req.user.id,9,`Изменение пароля`)
            return res.status(200).json(result)
        }catch (e){
            next(e)
        }
    }

    async refresh(req,res,next) {
        try{
            const refreshToken = req.cookies['refreshToken']
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true}) // sameSite:'None',secure:true - НА сервер, для HTTPS !!!!!!!
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
    async bye(req,res,next){
        try{
            const {termText,selected} = req.body
            const usersData = await userService.bye(termText,selected,req.user.tn)
            return res.status(200).json(usersData)
        }catch (e){
            next(e)
        }
    }
    async checkBye(req,res,next){
        try{
            const isBye = await userService.checkBye(req.user.tn)
            return res.status(200).json(isBye)
        }catch (e){
            next(e)
        }
    }

    async setAvatar(req,res,next){
        try{
            const file = req.files.file
            const newname = FilesService.generateRandomFileName()
            const type = file.name.split('.').pop()
            const path = PATH.join(`${config.get('public_path')}`,'profile',`${newname}.${type}`);
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)
            await FilesService.compressResizeAndSaveImage(path,80, 300, 400)
            const avatar = `${newname}.${type}`
            await User.update({ avatar: avatar }, { where: { id: req.user.id } });
            await HistoryService.createAction(req.user.id,9,`Установка аватара`)
            return res.status(200).json({path:avatar})
        }catch (e){
            next(e)
        }
    }
    async getstat(req,res,next){
        try{
            const usersStat = await userService.getstat()
            return res.status(200).json(usersStat)
        }catch (e){
            next(e)
        }
    }

    async getusers(req,res,next){
        try{
            const {sort} = req.body
            const users = await userService.getusers(sort)
            return res.status(200).json(users)
        }catch (e){
            next(e)
        }
    }
    async getSizes(req,res,next){
        try{
            const sizes = await userService.getSizes(req.user.id)
            if(!sizes) return res.status(200).json([0,0,0])
            const arr = sizes.split("-")
            return res.status(200).json(arr)
        }catch (e){
            next(e)
        }
    }
    async setSizes(req,res,next){
        try{
            console.log(req.user.id)
            const {sizes} = req.body
            const users = await userService.setSizes(sizes,req.user.id)
            await HistoryService.createAction(req.user.id,9,`Изменение размера одежды`)
            return res.status(200).json(users)
        }catch (e){
            next(e)
        }
    }
    async createPreReg(req,res,next){
        try{
            const {user} = req.body
            const reg = await userService.createPreReg(user)
            await HistoryService.createAction(req.user.id,9,`Заявка на регистрацию ${user.full_name} `)
            return res.status(200).json(reg)
        }catch (e){
            next(e)
        }
    }
    async changeZa(req,res,next){
        try{
            const {user} = req.body
            const reg = await userService.changeZa(user)
            return res.status(200).json(reg)
        }catch (e){
            next(e)
        }
    }

    async removeZa(req,res,next){
        try{
            const reg = await userService.removeZa(req.body.id)
            return res.status(200).json(reg)
        }catch (e){
            next(e)
        }
    }

    async getPrereg(req,res,next){
        try{
            const preregs = await userService.getPrereg()
            return res.status(200).json(preregs)
        }catch (e){
            next(e)
        }
    }
    async FixRegister(req,res,next){
        try{
            const {full_name,login,email,password,phone,avatar} = req.body
            const user = await userService.FixRegister(full_name,login,email,password,phone,avatar)
            await HistoryService.createAction(req.user.id,9,`Регистрация ${full_name} Администратором `)
            return res.status(200).json(user)
        }catch (e){
            next(e)
        }
    }
    async getUnphoto(req,res,next){
        try{
            const users = await userService.getUnphoto()
            return res.status(200).json(users)
        }catch (e){
            next(e)
        }
    }
    async setFixAva(req,res,next){
        try{
            const {worker,avatar} = req.body
            const user = await userService.setFixAva(worker,avatar)
            await HistoryService.createAction(req.user.id,9,`Установка Аватара Администратором ${worker}`)
            return res.status(200).json(user)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new UsersController()