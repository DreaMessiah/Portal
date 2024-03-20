const {Router} = require('express')
const router = Router()
const PostsController = require('../controllers/posts.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/get',authMiddlewere,PostsController.get)
router.get('/getlist',authMiddlewere,PostsController.getList)
router.post('/create',authMiddlewere,PostsController.create)
router.post('/getpost',authMiddlewere,PostsController.getPost)
router.post('/remove',authMiddlewere,PostsController.setRemove)

module.exports = router
