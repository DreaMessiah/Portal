import $api from "../http"

export default class MainpageService {
    static async pushBestMan(man){
        console.log(man)
        return $api.post(`/objects/bestman`, man)
    }
}