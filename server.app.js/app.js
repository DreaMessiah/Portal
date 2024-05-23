const express = require('express')
const https = require('https')
const config = require('config')
const cors = require('cors')
const sequelize = require('./db')
const app = express()
const PORT = config.get('serverPort')
const PORT_HTTPS = config.get('httpsPort')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const mailService = require('./service/mail.service')
const fileUpload = require('express-fileupload')
const errorMiddlewere = require('./middleware/error.middlewere')
const path = require('path')
const fs = require("fs");

const AutomakerService = require('./service/automaker.service')
const cron = require('node-cron')

const root = path.join(__dirname,'client','build')

const redirectHTTPtoHTTPS = (req, res, next) => {
    if (!req.secure) {
        // Если запрос пришел не по HTTPS, перенаправляем на HTTPS
        return res.redirect('https://' + req.hostname + req.url);
    }
    next()
}

app.use(redirectHTTPtoHTTPS)
app.use(cookieParser())
app.use(cors({
    origin: config.get('client_url'),
    credentials: true // Если используются учетные данные, например, куки или заголовки авторизации
}))

app.use(express.json({ extended: true,limit: '3mb' }))
app.use(express.urlencoded({ extended: true,limit: '3mb' }))

app.use(fileUpload({}))

app.use('/api', router)

app.use('/files', express.static('/mnt/server/files'));

app.use('/',express.static(root))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})
app.use(errorMiddlewere) //Обязательно последний!
//*******************************************************\
const httpsOptions = {
    key: fs.readFileSync('./ssl/srsuportal.ru.key'),
    cert: fs.readFileSync('./ssl/srsuportal.ru.crt')
}
const server = https.createServer(httpsOptions, app);

cron.schedule('0 0 * * *', () => {
//cron.schedule('12 8 * * *', () => {
    AutomakerService.recordLoginCount()
}, {
    scheduled: true,
    timezone: "Asia/Yekaterinburg" // Укажите ваш часовой пояс
})


const start = async () => {
    try{
        server.listen(PORT_HTTPS,() => {
            console.log('Server started on port : ', PORT_HTTPS)
        })
        app.listen(PORT, () => {
            console.log('HTTP Server started on port', PORT);
        })
        //await mailService.sendActivationMail('barahtasurgut@gmail.com','HuY!')
        await sequelize.authenticate()
        //await sequelize.sync({ alter: true })
        console.log('connect to DB')
    }catch (e){
        console.log(e)
    }
}

start()