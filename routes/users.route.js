const {Router} = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')
const {body} = require('express-validator')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/login',usersController.login)
router.post('/logout',usersController.logout)
router.get('/refresh',usersController.refresh)
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


module.exports = router