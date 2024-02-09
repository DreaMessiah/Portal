const {Router} = require('express')
const router = Router()
const PaylistController = require('../controllers/payslip.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/get',authMiddlewere,PaylistController.get)

module.exports = router