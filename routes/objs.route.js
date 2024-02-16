const {Router} = require('express')
const router = Router()

const objsController = require('../controllers/objs.controller')
router.post('/getlistobjs', objsController.getListObjs)
router.post('/viewobjs', objsController.showObjs)
router.post('/insertobj', objsController.insertObjs)
router.post('/getalltabels', objsController.getAllTabels)
router.post('/createtabel', objsController.createTabels)


module.exports = router