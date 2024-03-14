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

    stat
    async create(text,creater_id,title,image = null) {
        const survey = await Survey.create({text:text,creater_id,image,title:title})
        //const surveyDto = new surveyDto(survey)
        return {survey}
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