const {Router} = require('express')
const router = Router()

const HistoryController = require("../controllers/history.controller")
const authMiddlewere = require("../middleware/auth.middleware")

router.get('/gettypes',authMiddlewere,HistoryController.getTypes)
router.post('/createtype',authMiddlewere,HistoryController.createType)
router.post('/createaction',authMiddlewere,HistoryController.createAction)
router.post('/gethistory',authMiddlewere,HistoryController.getAllHistory)
router.post('/gethourshistory',authMiddlewere,HistoryController.getHoursHistory)
router.post('/getmonthhistory',authMiddlewere,HistoryController.getMonthHistory)

module.exports = router