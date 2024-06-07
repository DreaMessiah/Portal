const {Router} = require('express')
const router = Router()

const aiController = require('../controllers/ai.controller')
const authMiddlewere = require("../middleware/auth.middleware")
const aiMiddlewere = require("../middleware/ai.middleware")

router.post('/send',authMiddlewere,aiMiddlewere, aiController.send)

module.exports = router