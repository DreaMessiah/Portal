const {Router,validationResult} = require('express')
const router = Router()

// /api/

router.post('/bd',async (req,res) => {
    try{

        const result = {}

        return res.status(200).json({result})
    }catch (e){
        res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
    }
})

module.exports = router

