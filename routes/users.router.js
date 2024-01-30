const {Router} = require('express')
const router = Router()

const usersController = require('../controllers/users.controller')

router.post('/login',usersController.login)
router.post('/logout',usersController.logout)
router.post('/refresh',usersController.refresh)
router.post('/registration',usersController.registration)
module.exports = router