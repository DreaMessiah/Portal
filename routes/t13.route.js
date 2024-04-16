const {Router} = require('express')
const router = Router()
const T13Controller = require('../controllers/t13.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/get',authMiddlewere,T13Controller.get)
router.get('/getactual',authMiddlewere,T13Controller.getActual)


module.exports = router