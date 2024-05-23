const {Router} = require('express')
const router = Router()
const MessagesController = require('../controllers/messages.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/messages',authMiddlewere,MessagesController.postMess)
router.post('/getmess',authMiddlewere,MessagesController.getMess)
router.post('/getmychats',authMiddlewere,MessagesController.getMyChats)
router.post('/searchmess',authMiddlewere,MessagesController.searchMess)
router.post('/sendmessage',authMiddlewere,MessagesController.sendMessage)

module.exports = router