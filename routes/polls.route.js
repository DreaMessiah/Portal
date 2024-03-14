const {Router} = require('express')
const router = Router()
const pollsController = require('../controllers/polls.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/get',authMiddlewere,pollsController.get)
router.post('/create',authMiddlewere,pollsController.create)
router.post('/getsurvey',authMiddlewere,pollsController.getSurvey)
router.post('/vote',authMiddlewere,pollsController.vote)
router.post('/getstat',authMiddlewere,pollsController.getStat)


module.exports = router