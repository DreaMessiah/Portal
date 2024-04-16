import $api from "../http"

export default class ManService {

    static async delManHumanList(man){
        return $api.post(`/mans/delman`, man)
    }

    static async getHumanList(){
        return $api.post(`/mans/humanlist`)
    }


    static async plusManHR(man){
        return $api.post(`/mans/plusman`, man)
    }


}