const Router = require('express')
const router = new Router()

const authRouter = require('./users.route')
const phonesRouter = require('./phones.route')
const payslipRouter = require('./payslip.route')
const t13Router = require('./t13.route')
const objsRouter = require('./objs.route')
const weldingRouter = require('./welding.route')
const odataRouter = require('./odata.route')
const filesRouter = require('./files.route')

router.use('/auth',authRouter)
router.use('/phones',phonesRouter)
router.use('/objects',objsRouter)
router.use('/welding',weldingRouter)
router.use('/payslip',payslipRouter)
router.use('/t13',t13Router)
router.use('/odata',odataRouter)
router.use('/files',filesRouter)

module.exports = router