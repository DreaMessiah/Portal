const Router = require('express')
const router = new Router()

const authRouter = require('./users.route')
const phonesRouter = require('./phones.route')

const weldingRouter = require('./welding.route')

router.use('/auth',authRouter)
router.use('/phones',phonesRouter)

router.use('/welding',weldingRouter)

module.exports = router