const {Router} = require('express')
const router = Router()
const T13Controller = require('../controllers/t13.controller')
const authMiddlewere = require('../middleware/auth.middleware')
const usersController = require("../controllers/users.controller");

router.post('/get',authMiddlewere,T13Controller.get)
router.get('/getuni',authMiddlewere,T13Controller.getUni)
router.get('/getactual',authMiddlewere,T13Controller.getActual)
router.get('/getworkers',authMiddlewere,T13Controller.getWorkers)
router.get('/getunreg',authMiddlewere,T13Controller.getUnreg)
router.get('/getbranchs',authMiddlewere,T13Controller.getBranchs)
router.get('/getstructure',authMiddlewere,T13Controller.getStructure)

router.post('/createstructure',authMiddlewere,T13Controller.createStructure)
router.post('/getworkersbranch',authMiddlewere,T13Controller.getWorkersBranch)
router.post('/deletebranch',authMiddlewere,T13Controller.deleteBranch)
router.post('/changecontact',authMiddlewere,T13Controller.changeContact)

router.post('/sendhrm',authMiddlewere,T13Controller.sendHrm)
router.post('/getcontacts',authMiddlewere,T13Controller.getContacts)
router.get('/checkhrm',authMiddlewere,T13Controller.checkHrm)
router.get('/gethrmanswers',authMiddlewere,T13Controller.getHrmAnswers)

router.post('/changeblack',authMiddlewere,T13Controller.changeBlack)
router.get('/getblack',authMiddlewere,T13Controller.getBlack)
router.get('/getallpeoples',authMiddlewere,T13Controller.getAllPeoples)

router.get('/getbyeanswers',authMiddlewere,T13Controller.getByeAnswers)
router.get('/getterm',authMiddlewere,T13Controller.getTerm)
router.get('/getnewusers',authMiddlewere,T13Controller.getNewUsers)

module.exports = router