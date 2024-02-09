const Router = require('express')
const router = new Router()

const authRouter = require('./users.route')
const phonesRouter = require('./phones.route')
const paylistRouter = require('./payslip.route')

router.use('/auth',authRouter)
router.use('/phones',phonesRouter)
router.use('/paylist',paylistRouter)

module.exports = router