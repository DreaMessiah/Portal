

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


// router.post('/pushnewobjwelding', weldingController.pushObjWelding)
// router.post('/viewobjssv', weldingController.viewObjSV)
// router.post('/getym', weldingController.getYM)
// router.post('/crym', weldingController.crYM)
// router.post('/getobjhook', weldingController.getObgForHook)

module.exports = router