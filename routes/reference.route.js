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

router.post('/sett13',authMiddlewere,ReferenceController.setT13)
router.post('/setpayslip',authMiddlewere,ReferenceController.setPayslip)

router.get('/getktudocs',authMiddlewere,ReferenceController.getKtuDocs)
router.post('/newktudoc',authMiddlewere,ReferenceController.newKtuDoc)
router.post('/delktudoc',authMiddlewere,ReferenceController.deleteKtuDocs)


router.post('/getktus',authMiddlewere,ReferenceController.getKtus)
router.post('/savektus',authMiddlewere,ReferenceController.saveKtus)
router.post('/delktus',authMiddlewere,ReferenceController.delKtus)

module.exports = router