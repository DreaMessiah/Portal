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
    static createSurvey(text,title) {
        return $api.post('/polls/create',{text,title})
    }
}