const {Router} = require('express')
const router = Router()
const pollsController = require('../controllers/polls.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/get',authMiddlewere,pollsController.get)
router.post('/create',authMiddlewere,pollsController.create)
router.post('/getsurvey',authMiddlewere,pollsController.getSurvey)
router.post('/vote',authMiddlewere,pollsController.vote)
router.post('/getstat',authMiddlewere,pollsController.getStat)
router.post('/remove',authMiddlewere,pollsController.setRemove)
router.post('/check',authMiddlewere,pollsController.checkExist)
router.post('/checkanswers',authMiddlewere,pollsController.checkAnswers)

router.get('/getkids',authMiddlewere,pollsController.getKids)
router.post('/newworks',authMiddlewere,pollsController.newWorks)
router.post('/votekid',authMiddlewere,pollsController.voteKid)
router.post('/checkcontests',authMiddlewere,pollsController.checkExistContests)



module.exports = router