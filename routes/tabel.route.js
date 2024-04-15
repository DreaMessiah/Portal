

const {Router} = require('express')
const router = Router()
const authMiddlewere = require('../middleware/auth.middleware')

const tabelController = require('../controllers/tabel.controller')
router.post('/plusman',authMiddlewere, tabelController.plusMan)
router.post('/editday',authMiddlewere, tabelController.editDay)
router.post('/thisobj',authMiddlewere, tabelController.myObj)
router.post('/transpotprice',authMiddlewere, tabelController.getTransport)
router.post('/thistabel',authMiddlewere, tabelController.getThisTabel)
router.post('/blocked',authMiddlewere, tabelController.blockedTabel)
router.post('/itogy',authMiddlewere, tabelController.getItogy)
router.post('/trashym',authMiddlewere, tabelController.trashYm)

module.exports = router