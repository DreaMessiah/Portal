

const {Router} = require('express')
const router = Router()
const authMiddlewere = require('../middleware/auth.middleware')

const tabelController = require('../controllers/tabel.controller')
router.post('/plusman', tabelController.plusMan)
router.post('/editday', tabelController.editDay)
router.post('/thisobj', tabelController.myObj)
router.post('/transpotprice', tabelController.getTransport)
router.post('/thistabel', tabelController.getThisTabel)

// router.post('/pushnewobjwelding', weldingController.pushObjWelding)
// router.post('/viewobjssv', weldingController.viewObjSV)
// router.post('/getym', weldingController.getYM)
// router.post('/crym', weldingController.crYM)
// router.post('/getobjhook', weldingController.getObgForHook)

module.exports = router