const {Router} = require('express')
const router = Router()
const phonesController = require('../controllers/phones.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/get',authMiddlewere,phonesController.get)
router.post('/add',authMiddlewere,phonesController.add)

module.exports = router