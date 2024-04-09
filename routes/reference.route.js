const {Router} = require('express')
const router = Router()
const ReferenceController = require('../controllers/reference.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/getworks',authMiddlewere,ReferenceController.getWorks)
router.get('/getogm',authMiddlewere,ReferenceController.getOgm)

router.post('/createworks',authMiddlewere,ReferenceController.createWorks)
router.post('/createogm',authMiddlewere,ReferenceController.createOgm)

router.post('/deleteworks',authMiddlewere,ReferenceController.deleteWorks)
router.post('/deleteogm',authMiddlewere,ReferenceController.deleteOgm)

router.post('/loadogm',authMiddlewere,ReferenceController.loadOgm)
router.post('/loadworks',authMiddlewere,ReferenceController.loadWorks)

router.post('/saveworks',authMiddlewere,ReferenceController.saveWorks)
router.post('/saveogm',authMiddlewere,ReferenceController.saveOgm)

module.exports = router