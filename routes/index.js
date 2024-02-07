const Router = require('express')
const router = new Router()

const authRouter = require('./users.route')
const phonesRouter = require('./phones.route')

router.use('/auth',authRouter)
router.use('/phones',phonesRouter)

module.exports = router