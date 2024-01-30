const express = require('express')
const config = require('config')
const cors = require('cors')
const sequelize = require('./db')
const app = express()
const PORT = config.get('serverPort')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const mailService = require('./service/mail.service')
const errorMiddlewere = require('./middleware/error.middlewere')


app.use(cookieParser())
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

app.use(errorMiddlewere) //Обязательно последний!
//*******************************************************\
const start = async () => {
    try{
        app.listen(PORT,() => {
            console.log('Server started on port : ', PORT)
        })
        //await mailService.sendActivationMail('test@gmail.com','test!')
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        console.log('connect to DB')
    }catch (e){
        console.log(e)
    }
}

start()