import $api from "../http"

export default class OdataService{
    static getpeoples(){
        return $api.get('/odata/peoples')
    }
}
