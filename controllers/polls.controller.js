const PollsService = require('../service/polls.service')
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
            const vote = await PollsService.setAnswer(req.user.id,survey_id,question_id)
            return res.status(200).json(vote)
        }catch (e) {
            next(e)
        }
    }

    async getKids(req,res,next) {
        try{
            const contests = await PollsService.getContests()
            return res.status(200).json(contests)
        }catch (e) {
            next(e)
        }
    }
    async newWorks(req,res,next) {
        try{
            const {contests,phone,mail} = req.body
            const check = await PollsService.checkExist(req.user.id)
            if (!check){
                const newItems = await PollsService.newWorks(req.user.id,phone,contests,mail)
                return res.status(200).json(newItems)
            }
            return res.status(200).json({message:'Заявка уже подавалась'})

        }catch (e) {
            next(e)
        }
    }
    async checkExistContests(req,res,next){
        try{
            return res.status(200).json( await PollsService.checkExist(req.user.id) )
        }catch (e) {
            next(e)
        }
    }
    async voteKid(req,res,next) {
        try{
            const {nominations} = req.body
            const check = await PollsService.checkKidsVote(+req.user.id)
            if(!check){
                const vote = await PollsService.setNominations(req.user.id,nominations)
                return res.status(200).json(vote)
            }else{
                return res.status(200).json({message:"Вы уже голосовали"})
            }

        }catch (e) {
            next(e)
        }
    }
    async getNomi(req,res,next){
        try{
            const nomi = await PollsService.getNomi()
            return res.status(200).json(nomi)
        }catch (e) {
            next(e)
        }
    }
    async checkVoteKids(req,res,next){
        try{
            const check = await PollsService.checkKidsVote(+req.user.id)
            return res.status(200).json({check:check})
        }catch (e) {
            next(e)
        }
    }
    async getVotes(req,res,next){
        try{
            const {id} = req.body
            const votes = await PollsService.getVotes(+id)
            return res.status(200).json(votes)
        }catch (e) {
            next(e)
        }
    }
    async getRe(req,res,next){
        try{
            const results = await PollsService.getRe()
            return res.status(200).json(results)
        }catch (e) {
            next(e)
        }
    }

}
module.exports = new PollsController()