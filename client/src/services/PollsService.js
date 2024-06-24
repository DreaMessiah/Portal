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
    static createSurvey(id,text,title,image,questions,onanswer) {
        return $api.post('/polls/create',{id,text,title,image,questions,onanswer})
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
    static getKids(){
        return $api.get('/polls/getkids')
    }
    static newWorks(contests,phone,mail){
        console.log(contests)
        return $api.post('/polls/newworks',{contests,phone,mail})
    }
    static checkExitsContests(){
        return $api.post('/polls/checkcontests')
    }
    static voteKid(nominations){
        return $api.post('/polls/votekid',{nominations})
    }
    static getNomi(){
        return $api.get('/polls/getnomi')
    }
    static checkVoteKids(){
        return $api.get('/polls/checkvote')
    }
    static getVotes(id){
        return $api.post('/polls/getvotes',{id})
    }
    static getRe(){
        return $api.get('/polls/getre')
    }

    static getStatWork(){
        return $api.get('/polls/getstatwork')
    }

}