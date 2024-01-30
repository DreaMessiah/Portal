const userService = require('../service/users.service')
const {User} = require("../models/models");
const {where} = require("sequelize");

class UsersController {
    async registration(req,res) {
        try{
            const {tn,full_name,login,email,password,inn} = req.body
            const userData = await userService.registration(tn,full_name,login,email,password,inn)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        }catch (e){
            console.log(e)
        }
    }

    async login(req,res) {
        try{
            const {login,password} = req.body
            const user = await User.findOne({ where:{login:login} })
            if(!user) return res.status(404).json({massage:'Пользователя с таким именем не существует'})
        }catch (e){

        }
    }
    async logout(req,res) {
        try{

        }catch (e){

        }
    }
    async refresh(req,res) {
        try{
           // res.json([123,456,789])
        }catch (e){

        }
    }
}

module.exports = new UsersController()