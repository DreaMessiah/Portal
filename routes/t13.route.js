const {Router} = require('express')
const router = Router()
const T13Controller = require('../controllers/t13.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/get',authMiddlewere,T13Controller.get)
router.get('/getuni',authMiddlewere,T13Controller.getUni)
router.get('/getactual',authMiddlewere,T13Controller.getActual)
router.get('/getworkers',authMiddlewere,T13Controller.getWorkers)
router.get('/getbranchs',authMiddlewere,T13Controller.getBranchs)
router.get('/getstructure',authMiddlewere,T13Controller.getStructure)

router.post('/createstructure',authMiddlewere,T13Controller.createStructure)

module.exports = router