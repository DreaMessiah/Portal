const express = require('express')
const config = require('config')
const cors = require('cors')
const sequelize = require('./db')
const app = express()
const PORT = config.get('serverPort')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const mailService = require('./service/mail.service')
const fileUpload = require('express-fileupload')
const errorMiddlewere = require('./middleware/error.middlewere')
const { createServer } = require('node:http')
const initializeSocket = require('./socket')
const AutomakerService = require('./service/automaker.service')
const cron = require('node-cron')

app.use(fileUpload({}))
app.use(cors({
    origin: config.get('client_url'),
    credentials: true // Если используются учетные данные, например, куки или заголовки авторизации
}))

app.use('/files', express.static(config.get('file_path')));
app.use(cookieParser())
app.use(express.json({ extended: true,limit: '3mb' }))
app.use(express.urlencoded({ extended: true,limit: '3mb' }))
app.use('/api', router)
app.use(errorMiddlewere) //Обязательно последний!
//*******************************************************\


const server = createServer(app)
const io = initializeSocket(server)
const start = async () => {
    try{
        //AutomakerService.recordLoginCount()
        server.listen(PORT,() => {
            console.log('Server started on port : ',config.get('api_url'), PORT)
        })
        //await mailService.sendActivationMail('barahtasurgut@gmail.com','HuY!')
        await sequelize.authenticate()
        // await sequelize.sync({ alter: true })
        console.log('connect to DB')

    }catch (e){
        console.log(e)
    }
}

start()