const {Router} = require('express')
const router = Router()

const objsController = require('../controllers/objs.controller')
router.post('/getlistobjs', objsController.getListObjs)
router.post('/viewobjs', objsController.showObjs)
router.post('/insertobj', objsController.insertObjs)
router.post('/getalltabels', objsController.getAllTabels)
router.post('/createtabel', objsController.createTabels)
router.post('/gett13', objsController.getT13)
router.post('/listtabel', objsController.listTabelMans)
router.post('/bestman', objsController.pushBestMan)
router.post('/viewbest', objsController.viewBestMan)
router.post('/delbest', objsController.delBestMan)

module.exports = router