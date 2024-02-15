const Router = require('express')
const router = new Router()

const authRouter = require('./users.route')
const phonesRouter = require('./phones.route')
const payslipRouter = require('./payslip.route')
const t13Router = require('./t13.route')

router.use('/auth',authRouter)
router.use('/phones',phonesRouter)
router.use('/payslip',payslipRouter)
router.use('/t13',t13Router)

module.exports = router