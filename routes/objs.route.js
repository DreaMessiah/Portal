

const {Router} = require('express')
const router = Router()

const objsController = require('../controllers/objs.controller')
router.post('/getlistobjs', objsController.getListObjs)

module.exports = router