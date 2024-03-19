const PollsService = require('../service/polls.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')

class PollsController {
    async get(req,res,next) {
        try{
            const pollsData = await PollsService.get(req.user.id)
            const updatedPollsData = await Promise.all(pollsData.map(async (item, index) => {
                const ans = await PollsService.checkAnswers(item.id);
                return {
                    ...item,
                    answers: ans
                }
            }))
            return res.status(200).json(updatedPollsData)
        }catch (e){
            next(e)
        }
    }
    async setRemove(req,res,next) {
        try{
            const {id} = req.body
            const pollsData = await PollsService.remove(id)
            return res.status(200).json(pollsData)
        }catch (e){
            next(e)
        }
    }
    async checkExist(req,res,next) {
        try{
            const {id} = req.body
            const pollsData = await PollsService.check(id)
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
            const {id,text,title,image,questions,onanswer} = req.body
            const answers = await PollsService.checkAnswers(id)
            if(!answers){
                const {survey} = await PollsService.updateSurvey(id,text,req.user.id,title,image,questions[0].type,onanswer)

                if(survey.id) {
                    const quests = await PollsService.updateQuestions(survey.id,questions)
                    if(quests) return res.status(200).json({survey,quests})
                    else{
                        return res.status(400).json({err:true,message:'Ошибка при обновлении или создании ответов'})
                    }
                }
                else{
                    return res.status(400).json({err:true,message:'Ошибка при обновлении или создании опроса'})
                }
            }else{
                return res.status(400).json({err:true,message:'Есть проголосовавшие, редактировать запрещено'})
            }
        }catch (e){
            next(e)
        }
    }
    async checkAnswers(req,res,next){
        const {id} = req.body
        const answers = await PollsService.checkAnswers(id)
        return res.status(200).json(answers)
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