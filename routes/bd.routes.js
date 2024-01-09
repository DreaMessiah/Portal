const {Router,validationResult} = require('express')
const router = Router()

// /api/

router.post('/bd',async (req,res) => {
    try{

        const result = [
            {
                name:'Epson L132',
                subdiv:'82а',
                town:'3',
                depart:'dsdfsdf',
                room:'rooooom',
                phone:'+89044444333'
            },
            {
                name:'Epson L132',
                subdiv:'82а',
                town:'3',
                depart:'dsdfsdf',
                room:'rooooom',
                phone:'+89044444333'
            },
            {
                name:'Epson L132',
                subdiv:'82а',
                town:'3',
                depart:'dsdfsdf',
                room:'rooooom',
                phone:'+89044444333'
            }
        ]

        return res.status(200).json({result})
    }catch (e){
        res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
    }
})

module.exports = router

