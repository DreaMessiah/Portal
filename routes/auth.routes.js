const {Router} = require('express')
const router = Router()

const authController = require('../controllers/authController')

router.post('/registration',authController.registration)
router.post('/login',authController.login)
router.get('/auth',authController.check)

module.exports = router