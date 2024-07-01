const {Router} = require('express')
const router = Router()
const MessagesController = require('../controllers/messages.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/messages',authMiddlewere,MessagesController.postMess)
router.post('/getmess',authMiddlewere,MessagesController.getMess)
router.post('/getmychats',authMiddlewere,MessagesController.getMyChats)
router.post('/searchmess',authMiddlewere,MessagesController.searchMess)
router.post('/sendmessage',authMiddlewere,MessagesController.sendMessage)
router.post('/offerpost',authMiddlewere,MessagesController.offerPost)
router.post('/pullvoice',authMiddlewere,MessagesController.messVoice)



router.get('/getchats',authMiddlewere,MessagesController.getChats)
router.post('/createchat',authMiddlewere,MessagesController.createChat)
router.post('/sendchatmessage',authMiddlewere,MessagesController.sendChatMessage)
router.post('/getmessages',authMiddlewere,MessagesController.getMessages)
router.post('/loadgroupavatar',authMiddlewere,MessagesController.loadGroupAvatar)
router.post('/isee',authMiddlewere,MessagesController.iSee)


module.exports = router