const PollsService = require('../service/polls.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')

class PollsController {
    async get(req,res,next) {
        try{
            const pollsData = await PollsService.get(req.user.id)
            return res.status(200).json(pollsData)
        }catch (e){
            next(e)
        }
    }
    async getSurvey(req,res,next) {
        try{
            const {id} = req.body
            const {surveys,questions,answers} = await PollsService.getSurvey(id,req.user.id)
            return res.status(200).json({surveys,questions,answers})
        }catch (e){
            next(e)
        }
    }
    async getStat(req,res,next) {
        try{
            const {id} = req.body
            const {questions,answers} = await PollsService.getStat(id)

            let statistics = [];
            console.log(questions)
            questions.forEach(question => {
                let total = 0
                let percent = 0
                answers.forEach(answer => {
                    if (answer.question_id === question.id) {
                        total = total+1
                    }
                })
                percent = total/answers.length * 100
                statistics = [...statistics,{text:question.text,total:total,percent:percent}]
            })


            return res.status(200).json(statistics)
        }catch (e){
            next(e)
        }
    }
    async create(req,res,next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при записи в базу опросов',errors.array()))
            const {text,title} = req.body
            const pollsData = await PollsService.create(text,req.user.id,title)
            return res.status(200).json(pollsData)
        }catch (e){
            next(e)
        }
    }
    async vote(req,res,next) {
        try{
            const {survey_id,question_id} = req.body
            console.log(survey_id,question_id)
            const vote = await PollsService.setAnswer(req.user.id,survey_id,question_id)
            return res.status(200).json(vote)
        }catch (e) {
            next(e)
        }
    }

}
module.exports = new PollsController()