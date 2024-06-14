const {Router} = require('express')
const router = Router()

const NotificationsController = require('../controllers/notifications.controller')
const authMiddlewere = require("../middleware/auth.middleware")

router.get('/loadtypes',authMiddlewere, NotificationsController.loadTypes)

router.post('/sendall',authMiddlewere, NotificationsController.sendAll)
router.post('/createtype',authMiddlewere, NotificationsController.createType)
router.post('/removetype',authMiddlewere, NotificationsController.removeType)


module.exports = router