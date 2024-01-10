const express = require('express')
const config = require('config')
const cors = require('cors')
const app = express()
const PORT = config.get('serverPort')

app.use(cors());
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/',require('./routes/bd.routes'))

//*******************************************************

const start = async () => {
    try{
        app.listen(PORT,() => {
            console.log('Server started on port : ', PORT)
        })
    }catch (e){
    }
}

start()