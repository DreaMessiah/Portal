const express = require('express')
const config = require('config')
const cors = require('cors')
const sequelize = require('./db')
const app = express()
const PORT = config.get('serverPort')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')

app.use(cookieParser())
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

//*******************************************************\
const start = async () => {
    try{
        app.listen(PORT,() => {
            console.log('Server started on port : ', PORT)
        })

        await sequelize.authenticate()
        await sequelize.sync({ alter: true })

        console.log('connect to DB')
    }catch (e){
        console.log(e)
    }
}

start()