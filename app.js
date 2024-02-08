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
app.use(cors({
    credentials: true,
    origin: config.get('client_url')
}))
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




        const O = 12300
        const K = 2.2
        const NDFL = 0.87
        const ZP = 85700

        const OKLDNDFL = O*K

        let ZPNDFL = ZP / NDFL
        let NUM = ZPNDFL - OKLDNDFL
        let PREM = NUM / K

        console.log((PREM+O)*K *NDFL)

        const RK = 0.7
        const SN = 0.5

        let SUMMRK = ( O + PREM) * RK
        let SUMMSN = ( O + PREM) * SN

        let PROV = (SUMMSN + SUMMRK + O + PREM) * NDFL



        console.log(PROV)

    }catch (e){
        console.log(e)


    }
}

start()