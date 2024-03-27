const {Router} = require('express')
const router = Router()
const phonesController = require('../controllers/phones.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/get',authMiddlewere,phonesController.get)
router.post('/add',authMiddlewere,phonesController.add)
router.post('/change',authMiddlewere,phonesController.change)
router.post('/delete',authMiddlewere,phonesController.delete)

router.get('/getmanagers',authMiddlewere,phonesController.getmanagers)
router.post('/sendmail',authMiddlewere,phonesController.sendmail)

module.exports = router