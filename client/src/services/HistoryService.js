import $api from "../http"

export default class HistoryService{
    static async getTypes(){
        return $api.get('/history/gettypes')
    }

    static async createType(name){
        return $api.post('/history/createtype',{name})
    }

}
