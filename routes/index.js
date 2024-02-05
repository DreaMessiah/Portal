const Router = require('express')
const router = new Router()

const authRouter = require('./users.router')

const weldingRouter = require('./welding.route')

router.use('/auth',authRouter)

router.use('/welding',weldingRouter)

module.exports = router