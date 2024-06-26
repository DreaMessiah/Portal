const {Router} = require('express')
const router = Router()
const PostsController = require('../controllers/posts.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/get',authMiddlewere,PostsController.get)
router.get('/getlist',authMiddlewere,PostsController.getList)
router.get('/getblocks',authMiddlewere,PostsController.getBlocks)
router.post('/create',authMiddlewere,PostsController.create)
router.post('/getpost',authMiddlewere,PostsController.getPost)
router.post('/getsinglepost',authMiddlewere,PostsController.getSinglePost)
router.post('/remove',authMiddlewere,PostsController.setRemove)
router.post('/setting',authMiddlewere,PostsController.getSetting)
router.post('/saveblocks',authMiddlewere,PostsController.saveBlocks)
router.post('/newcomment',authMiddlewere,PostsController.newComment)
router.post('/getcomments',authMiddlewere,PostsController.getComments)
router.post('/changecomment',authMiddlewere,PostsController.changeComment)
router.post('/deletecomment',authMiddlewere,PostsController.deleteComment)

router.post('/setlike',authMiddlewere,PostsController.setLike)

module.exports = router
