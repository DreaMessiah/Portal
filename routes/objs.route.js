const {Router} = require('express')
const router = Router()
const authMiddlewere = require('../middleware/auth.middleware')

const objsController = require('../controllers/objs.controller')


router.post('/thisobj',authMiddlewere, objsController.thisObj)
router.get('/getlistobjs',authMiddlewere, objsController.getListObjs)
router.get('/viewobjs',authMiddlewere, objsController.showObjs)
router.post('/insertobj',authMiddlewere, objsController.insertObjs)

router.post('/getalltabels',authMiddlewere, objsController.getAllTabels)
router.post('/getforall',authMiddlewere, objsController.getTabelsForAll)




router.post('/createtabel',authMiddlewere, objsController.createTabels)
router.post('/gett13',authMiddlewere, objsController.getT13)
router.post('/listtabel',authMiddlewere, objsController.listTabelMans)
router.post('/bestman',authMiddlewere, objsController.pushBestMan)
router.post('/viewbest',authMiddlewere, objsController.viewBestMan)
router.post('/delbest',authMiddlewere, objsController.delBestMan)

router.post('/getktudate',authMiddlewere, objsController.getKTUdate)
router.post('/copytabel',authMiddlewere, objsController.copyTab)
router.post('/delmantabel',authMiddlewere, objsController.delManTabel)
router.get('/getuserslist',authMiddlewere, objsController.getUsersList)
router.post('/passobj',authMiddlewere, objsController.passObj)
router.post('/usersobjs',authMiddlewere, objsController.dataOfObj)
router.get('/getpriory',authMiddlewere, objsController.getPriory)
router.post('/getobjssrto',authMiddlewere, objsController.getTabelSRTO)







module.exports = router