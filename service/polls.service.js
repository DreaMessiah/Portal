const {Survey,Question,Answer, Files} = require('../models/models')
const SurveyDto = require('../dtos/surveyDto')
const ApiError = require('../exceptions/api.error')
class PollsService{
    async get(user_id) {
        const surveys = await Survey.findAll({ where: { trash: false} })
        if(!surveys) throw ApiError.BadRequest('База с опросами пуста')
        const polls = [];
        await Promise.all(surveys.map(async (item) => {
            const answer = await Answer.findOne({ where: { survey_id: +item.id, user_id: +user_id } });
            polls.push({ ...item.dataValues, status: !!answer });
        }));

        console.log(polls);
        //const SurveyDto = new SurveyDto(survey)
        //console.log(book)
        return polls
    }
    async getSurvey(id,user_id) {
        const surveys = await Survey.findOne({where:{id:+id,trash:false}})
        if(!surveys) throw ApiError.BadRequest('Опрос не найден в базе')
        const questions = await Question.findAll({where:{survey_id:+id}})
        if(!questions) throw ApiError.BadRequest('Нет ответов в базе')
        const answers = await Answer.findOne({where:{survey_id:+id,user_id:+user_id}})
        return {surveys,questions,answers}
    }
    async getStat(id) {
        const questions = await Question.findAll({where:{survey_id:+id}})
        if(!questions) throw ApiError.BadRequest('Нет ответов в базе')
        const answers = await Answer.findAll({where:{survey_id:+id}})

        return {questions,answers}
    }
    async remove(id) {
        const survey = await Survey.findOne({where:{id:+id}})
        if(!survey) throw ApiError.BadRequest('Нет вопроса с таким id в базе')
        survey.trash = true
        survey.save()

        return {survey}
    }
    async check(id) {
        const survey = await Survey.findOne({where:{id:+id,trash:false}})
        if(!survey) return {exist:false}
        return {exist:true}
    }

    async updateSurvey(id,text,creater_id,title,image = null,type,onanswer) {
        if (!isNaN(+id)) {
            const survey = await Survey.findOne({where: {id: +id}})
            if (survey) {
                survey.text = text
                survey.title = title
                survey.image = image
                survey.type = type
                survey.onanswer = onanswer
                await survey.save()
                return {survey}
            }
        }
        return await this.createSurvey(text, creater_id, title, image, type,onanswer)
    }
    async updateQuestions(id,questions) {
        const questionslist = await Question.findAll({where:{survey_id:id}})
        console.log(questionslist)
        if(questionslist){
            questionslist.map((item,index) => {
                item.destroy()
            })
        }
        if(questions.length && !isNaN(+id)) {
            questions.map(async (item) => {
                return await this.createQuestion(item,+id)
            })
            return {questions}
        }else{
            return false
        }
    }
    async createQuestion(question,survey_id) {
        const newQuestion = await Question.create({survey_id,type:question.type,text:question.text})
        return {newQuestion}
    }
    async createSurvey(text,creater_id,title,image = null,type,onanswer) {
        const survey = await Survey.create({text:text,creater_id,image,title:title,type,onanswer:onanswer,trash:false})
        return {survey}
    }
    async checkAnswers(id){
        if(!isNaN(+id)){
            let answers = await Answer.findAll({where:{survey_id:+id}})
            if(answers) return answers.length
        }
        return false
    }
    async setAnswer(user_id,survey_id,question_id){
        let answer = await Answer.findAll({where:{user_id:+user_id,survey_id:+survey_id}})
        console.log(answer)
        if(answer.length) throw ApiError.BadRequest('Вы уже проголосовали')
        answer = await Answer.create({question_id:question_id,user_id:user_id,survey_id:survey_id})
        return {answer}
    }
}









module.exports = new PollsService()