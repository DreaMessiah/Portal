const {Router} = require('express')
const router = Router()
const T13Controller = require('../controllers/t13.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/get',authMiddlewere,T13Controller.get)

module.exports = router