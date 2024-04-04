const {Router} = require('express')
const router = Router()
const TasksController = require('../controllers/tasks.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.get('/priority',authMiddlewere,TasksController.getPriority)
router.get('/objects',authMiddlewere,TasksController.getObjects)
router.get('/users',authMiddlewere,TasksController.getUsers)
router.get('/groups',authMiddlewere,TasksController.getGroups)

router.post('/creategroup',authMiddlewere,TasksController.createGroup)
router.post('/deletegroup',authMiddlewere,TasksController.deleteGroup)

router.post('/create',authMiddlewere,TasksController.createTask)

module.exports = router