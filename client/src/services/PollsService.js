import $api from "../http"

export default class PollsService {
    static fetchPolls() {
        return $api.get('/polls/get')
    }
    static fetchSurvey(id) {
        return $api.post('/polls/getsurvey',{id})
    }
    static fetchStat(id) {
        return $api.post('/polls/getstat',{id})
    }
    static vote(survey_id,question_id) {
        return $api.post('/polls/vote',{survey_id,question_id})
    }
    static createSurvey(id,text,title,image,questions) {
        return $api.post('/polls/create',{id,text,title,image,questions})
    }
    static removeSurvey(id) {
        return $api.post('/polls/remove',{id})
    }
    static checkExist(id){
        return $api.post('/polls/check',{id})
    }
    static checkAnswers(id){
        return $api.post('/polls/checkanswers',{id})
    }


}