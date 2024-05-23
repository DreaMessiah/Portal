

const {Router} = require('express')
const router = Router()


const socialityController = require('../controllers/sociality.controller')
const authMiddlewere = require("../middleware/auth.middleware")

router.post('/createprogram',authMiddlewere, socialityController.createProgram)
router.post('/getprogram',authMiddlewere, socialityController.getProgram)
router.post('/updateprogram',authMiddlewere, socialityController.updateProgram)
router.post('/delprogram',authMiddlewere, socialityController.delProgram)
router.get('/getcommission',authMiddlewere, socialityController.getComission)
router.post('/pluscommssion',authMiddlewere, socialityController.plusComission)
router.post('/delcommssion',authMiddlewere, socialityController.delComission)



module.exports = router