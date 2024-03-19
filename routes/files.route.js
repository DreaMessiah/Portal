const {Router} = require('express')
const router = Router()
const FilesController = require('../controllers/files.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/get',authMiddlewere,FilesController.getFiles)
router.post('/getall',authMiddlewere,FilesController.getAllFiles)
router.post('/upload',authMiddlewere,FilesController.uploadFile)
router.post('/dir',authMiddlewere,FilesController.createDir)
router.post('/getpath',authMiddlewere,FilesController.getPath)
router.post('/loadimg',authMiddlewere,FilesController.loadImg)
router.post('/loadpollsimg',authMiddlewere,FilesController.loadPollsImg)


module.exports = router