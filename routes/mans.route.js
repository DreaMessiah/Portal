

const {Router} = require('express')
const router = Router()


const manController = require('../controllers/mans.controller')
const authMiddlewere = require("../middleware/auth.middleware")

router.post('/plusman',authMiddlewere, manController.plusManHR)
router.post('/humanlist',authMiddlewere, manController.getHumanList)
router.post('/delman',authMiddlewere, manController.delManHumanList)


module.exports = router