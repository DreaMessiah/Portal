const {Router} = require('express')
const router = Router()

const socialityController = require('../controllers/sociality.controller')
const authMiddlewere = require("../middleware/auth.middleware")

router.get('/getmyza',authMiddlewere, socialityController.getMyZa)
router.get('/getallza',authMiddlewere, socialityController.getAllZa)
router.get('/getcommission',authMiddlewere, socialityController.getComission)
router.get('/getprotacolstatuses',authMiddlewere, socialityController.getProtStatus)

router.post('/createprogram',authMiddlewere, socialityController.createProgram)
router.post('/getprogram',authMiddlewere, socialityController.getProgram)
router.post('/updateprogram',authMiddlewere, socialityController.updateProgram)
router.post('/delprogram',authMiddlewere, socialityController.delProgram)
router.post('/pluscommssion',authMiddlewere, socialityController.plusComission)
router.post('/delcommssion',authMiddlewere, socialityController.delComission)
router.post('/createnewza',authMiddlewere, socialityController.createZaSocial)
router.post('/downloaddoc',authMiddlewere, socialityController.downloadDoc)
router.post('/reverstatus',authMiddlewere, socialityController.reverStatus)
router.post('/makeprotocol',authMiddlewere, socialityController.makeProtocol)
router.post('/getprotocols',authMiddlewere, socialityController.getProtocols)



module.exports = router