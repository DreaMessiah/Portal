

const {Router} = require('express')
const router = Router()
const authMiddlewere = require('../middleware/auth.middleware')

const weldingController = require('../controllers/welding.controller')

router.post('/getlistobjs', weldingController.getListObjs)

module.exports = router