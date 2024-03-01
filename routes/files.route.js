const {Router} = require('express')
const router = Router()
const FilesController = require('../controllers/files.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/get',authMiddlewere,FilesController.getFiles)
router.post('/dir',authMiddlewere,FilesController.createDir)

module.exports = router