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

const AutomakerService = require('./service/automaker.service')
const cron = require('node-cron')

app.use(fileUpload({}))
app.use(cors({
    origin: config.get('client_url'),
    credentials: true // Если используются учетные данные, например, куки или заголовки авторизации
}));

//HTTPS//Socket.IO/////
// const fs = require('fs')
// const https = require('https')
// const {logger} = require("sequelize/lib/utils/logger");
// const server = https.createServer({
//     key: fs.readFileSync('./ssl/192.168.0.166-key.pem'),
//     cert: fs.readFileSync('./ssl/192.168.0.166.pem')
// },app)
// const io = require("socket.io")(server,{
//     cors:{
//         origin: "*",
//         credentials: true,
//     }
// })
// let connectedClients = {};
// io.on('connection', socket => {
//     const username = socket.handshake.query.username
//
//     if (connectedClients[username]) {
//         io.sockets.sockets.get(connectedClients[username]).disconnect(true);
//     }
//
//     connectedClients[username] = socket.id;
//
//     socket.emit("me", socket.id)
//
//     socket.on('disconnect',() => {
//         delete connectedClients[username];
//         socket.broadcast.emit("callEnded")
//     })
//
//     socket.emit("clients",Object.entries(connectedClients))
//
//     socket.on('callUser',data => {
//         io.to(data.userToCall).emit("callUser",{signal: data.signalData, from: data.from, name: data.name})
//     })
//     socket.on('answerCall', data => {
//         io.to(data.to).emit("callAccepted",data.signal)
//     })
// })

//////////////
app.use('/files', express.static(config.get('file_path')));
app.use(cookieParser())
app.use(express.json({ extended: true,limit: '3mb' }))
app.use(express.urlencoded({ extended: true,limit: '3mb' }))
app.use('/api', router)
app.use(errorMiddlewere) //Обязательно последний!
//*******************************************************\

const start = async () => {
    try{
        AutomakerService.recordLoginCount()
        app.listen(PORT,() => {
            console.log('Server started on port : ', PORT)
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