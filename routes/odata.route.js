const {Router} = require('express')
const router = Router()
const odataController = require('../controllers/odata.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/peoples',authMiddlewere,odataController.getpeoples)

module.exports = router