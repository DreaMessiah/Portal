const Router = require('express')
const router = new Router()

const authRouter = require('./users.router')

router.use('/auth',authRouter)

module.exports = router