const {Router} = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')
const {body} = require('express-validator')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/login',usersController.login)
router.post('/logout',usersController.logout)
router.post('/tnenter',usersController.tnenter)
router.post('/setfz152',usersController.setfz152)

router.get('/getstat',usersController.getstat)
router.post('/getusers',usersController.getusers)

router.get('/refresh',usersController.refresh)

router.post('/createuser',
    body('password').isLength({min:3, max:32}).withMessage('Длинна пароля должна быть не мешьше 8ми и не больше 32х символов'),
    body('login').isLength({ min: 4, max: 20 }).withMessage('Имя пользователя должно быть от 4 до 20 символов')
        .matches(/^[a-z0-9_!@$]+$/).withMessage('Имя пользователя должно содержать только латинские буквы и цифры')
        .not().isEmpty().withMessage('Имя пользователя не должно быть пустым')
    ,usersController.createuser)


router.post('/registration',
    body('email').isEmail().withMessage('Некорректный EMail адрес'),
    body('password').isLength({min:3, max:32}).withMessage('Длинна пароля должна быть не мешьше 8ми и не больше 32х символов'),
    body('login').isLength({ min: 4, max: 20 }).withMessage('Имя пользователя должно быть от 4 до 20 символов')
        .matches(/^[a-z]+$/).withMessage('Имя пользователя должно содержать только латинские буквы')
        .not().isEmpty().withMessage('Имя пользователя не должно быть пустым'),
    body('inn').isLength({ min: 4, max: 10 }).withMessage('ИНН организации должно быть от 4 до 10 символов'),
    body('tn').isLength({ min: 1, max: 20 }).withMessage('Табельный номер не может быть больше 20ти символов'),
    body('full_name').isLength({ min: 6, max: 100 }).withMessage('ФИО не может быть меньше 6 и больше 100 символов')
    ,usersController.registration)

///////////////////////////////////////////////////////////////
router.get('/users',authMiddlewere,usersController.refresh)
router.get('/get',authMiddlewere,usersController.get)
//Запрос выполниться только для авторизованных пользователей !
////////////////////////////////////////////////////////////////
router.post('/setavatar',authMiddlewere,usersController.setAvatar)
router.post('/changepass',authMiddlewere,usersController.changePassword)
router.post('/bye',authMiddlewere,usersController.bye)
router.get('/isbye',authMiddlewere,usersController.checkBye)

router.get('/getsizes',authMiddlewere,usersController.getSizes)
router.post('/setsizes',authMiddlewere,usersController.setSizes)
router.post('/createreg',authMiddlewere,usersController.createPreReg)
router.post('/changeza',authMiddlewere,usersController.changeZa)

router.get('/getreg',authMiddlewere,usersController.getPrereg)
router.get('/getunphoto',authMiddlewere,usersController.getUnphoto)
router.post('/setfixava',authMiddlewere,usersController.setFixAva)

router.post('/removeza',authMiddlewere,usersController.removeZa)


router.post('/fixregister',authMiddlewere,
    body('password').isLength({min:3, max:32}).withMessage('Длинна пароля должна быть не мешьше 8ми и не больше 32х символов'),
    body('login').isLength({ min: 4, max: 20 }).withMessage('Имя пользователя должно быть от 4 до 20 символов')
        .matches(/^[a-z]+$/).withMessage('Имя пользователя должно содержать только латинские буквы')
        .not().isEmpty().withMessage('Имя пользователя не должно быть пустым'),
    body('full_name').isLength({ min: 6, max: 100 }).withMessage('ФИО не может быть меньше 6 и больше 100 символов')
    ,usersController.FixRegister)

module.exports = router