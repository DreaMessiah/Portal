const {Router} = require('express')
const router = Router()
const authMiddlewere = require('../middleware/auth.middleware')

const objsController = require('../controllers/objs.controller')

router.get('/getlistobjs',authMiddlewere, objsController.getListObjs)
router.get('/viewobjs',authMiddlewere, objsController.showObjs)
router.post('/insertobj',authMiddlewere, objsController.insertObjs)

router.post('/getalltabels',authMiddlewere, objsController.getAllTabels)
router.post('/createtabel',authMiddlewere, objsController.createTabels)
router.post('/gett13',authMiddlewere, objsController.getT13)
router.post('/listtabel',authMiddlewere, objsController.listTabelMans)
router.post('/bestman',authMiddlewere, objsController.pushBestMan)
router.post('/viewbest',authMiddlewere, objsController.viewBestMan)
router.post('/delbest',authMiddlewere, objsController.delBestMan)

router.post('/getktudate',authMiddlewere, objsController.getKTUdate)
router.post('/copytabel',authMiddlewere, objsController.copyTab)
router.post('/delmantabel',authMiddlewere, objsController.delManTabel)


module.exports = router