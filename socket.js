const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const tokeService = require("./service/token.service");
const ApiError = require("./exceptions/api.error");

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: 'http://192.168.0.166:3000',
            credentials: true
        }
    })
    const connectedClients = {}
    io.use((socket, next) => {
        const token = socket.handshake.auth.token
        const userData = tokeService.validateAccessToken(token)
        if(!userData) next(ApiError.UnauthorizedError())
        socket.user = userData
        next()
    })

    io.on('connection', (socket) => {
        console.log('a user connected')
        const userTn = socket.user ? socket.user.tn : null
        if (userTn) {
            if (connectedClients[userTn]) {
                io.to(connectedClients[userTn]).emit('forceDisconnect');
            }
            connectedClients[userTn] = socket.id;
        }

        socket.on('message', data => {
            const {from,to,message} = data
            const recipientSocketId = connectedClients[to] ? connectedClients[to] : null

            console.log(connectedClients)

            if(recipientSocketId){
                io.to(recipientSocketId).emit('receiveMessage', {
                    from: from,
                    message: message
                })
            }
        })

        socket.on('online', (data, callback) => {
            callback(Object.keys(connectedClients))
        })

        socket.on('disconnect', () => {
            if (userTn) delete connectedClients[userTn]
            console.log('user disconnected')
        })
    })

    return io
}

module.exports = initializeSocket


// socket.on('message', (data, callback) => {
//     console.log('message:',data.message)
//     console.log(socket)
//     // const response = {
//     //     message: 'Data received successfully',
//     // }
//     callback(connectedClients) // Отправка ответа обратно клиенту
// })
//HTTPS//Socket.IO/////
// const fs = require('fs')
// const https = require('https')
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
//     if (connectedClients[username]) {
//         io.sockets.sockets.get(connectedClients[username]).disconnect(true);
//     }
//     connectedClients[username] = socket.id;
//     socket.emit("me", socket.id)
//     socket.on('disconnect',() => {
//         delete connectedClients[username];
//         socket.broadcast.emit("callEnded")
//     })
//     socket.emit("clients",Object.entries(connectedClients))
//     socket.on('callUser',data => {
//         io.to(data.userToCall).emit("callUser",{signal: data.signalData, from: data.from, name: data.name})
//     })
//     socket.on('answerCall', data => {
//         io.to(data.to).emit("callAccepted",data.signal)
//     })
// })

//////////////