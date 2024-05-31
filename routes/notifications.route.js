const {Router} = require('express')
const router = Router()

const NotificationsController = require('../controllers/notifications.controller')
const authMiddlewere = require("../middleware/auth.middleware")

router.post('/sendall',authMiddlewere, NotificationsController.sendAll)



module.exports = router