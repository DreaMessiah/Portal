

const {Router} = require('express')
const router = Router()
const authMiddlewere = require('../middleware/auth.middleware')

const weldingController = require('../controllers/welding.controller')
router.post('/getlistobjs', weldingController.getListObjs)
router.post('/getallcrew', weldingController.getCrew)
router.post('/pushnewobjwelding', weldingController.pushObjWelding)
router.post('/viewobjssv', weldingController.viewObjSV)
router.post('/getym', weldingController.getYM)
router.post('/crym', weldingController.crYM)
router.post('/getobjhook', weldingController.getObgForHook)
router.post('/getmycrews', weldingController.getMyCrews)

module.exports = router