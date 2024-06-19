import $api from "../http"

export default class HistoryService{
    static async getTypes(){
        return $api.get('/history/gettypes')
    }
    static async createType(name){
        return $api.post('/history/createtype',{name})
    }
    static async getHistory(sort,direction,page,type,date,user){
        return $api.post('/history/gethistory',{sort,direction,page,type,date,user})
    }
    static async getHoursHistory(day){
        return $api.post('/history/gethourshistory',{day})
    }
    static async getMonthHistory(month){
        return $api.post('/history/getmonthhistory',{month})
    }

}
