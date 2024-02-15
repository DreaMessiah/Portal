const {Router} = require('express')
const router = Router()
const PaylistController = require('../controllers/payslip.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/getdays',authMiddlewere,PaylistController.getDays)
router.post('/getinfo',authMiddlewere,PaylistController.getInfo)
router.post('/getktu',authMiddlewere,PaylistController.getKtu)
router.post('/data',authMiddlewere,PaylistController.getData)


module.exports = router