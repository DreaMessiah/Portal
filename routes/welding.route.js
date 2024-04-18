

const {Router} = require('express')
const router = Router()


const weldingController = require('../controllers/welding.controller')
const authMiddlewere = require("../middleware/auth.middleware")

router.post('/getlistobjs',authMiddlewere, weldingController.getListObjs)
router.post('/getallcrew',authMiddlewere, weldingController.getCrew)
router.post('/pushnewobjwelding',authMiddlewere, weldingController.pushObjWelding)
router.post('/viewobjssv',authMiddlewere, weldingController.viewObjSV)
router.post('/getym',authMiddlewere, weldingController.getYM)
router.post('/crym',authMiddlewere, weldingController.crYM)
router.post('/getobjhook',authMiddlewere, weldingController.getObgForHook)
router.post('/getmycrews',authMiddlewere, weldingController.getMyCrews)
router.post('/gettabsv',authMiddlewere, weldingController.getTabelSv)
router.post('/createcrew',authMiddlewere, weldingController.createCrew)
router.post('/updateman',authMiddlewere, weldingController.updateManDays)
router.post('/getviewwork',authMiddlewere, weldingController.getViewWorkSV)
router.post('/plusvw',authMiddlewere, weldingController.plusVW)
router.post('/createza',authMiddlewere, weldingController.createZa)
router.post('/getzasv',authMiddlewere, weldingController.getZasv)
router.post('/getstatus',authMiddlewere, weldingController.getStatuses)
router.post('/changestat',authMiddlewere, weldingController.changeStat)
router.post('/deleteza',authMiddlewere, weldingController.deleteZa)
router.post('/getconn',authMiddlewere, weldingController.getConn)
router.post('/saveconn',authMiddlewere, weldingController.saveConn)
router.post('/addweldman',authMiddlewere, weldingController.addMan)
router.post('/deleteman',authMiddlewere, weldingController.deleteMan)
router.post('/createnewcrew',authMiddlewere, weldingController.createNewCrew)
router.post('/loadmanstocrew',authMiddlewere, weldingController.loadMansToCrew)
router.post('/loadcrewdata',authMiddlewere, weldingController.loadCrewData)
router.post('/savecrewmans',authMiddlewere, weldingController.saveCrewMans)


module.exports = router