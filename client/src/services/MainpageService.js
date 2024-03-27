import $api from "../http"

export default class MainpageService {
    static async pushBestMan(man){
        return $api.post(`/objects/bestman`, man)
    }
    static async viewBestMan(inn){
        return $api.post(`/objects/viewbest`, inn)
    }
    static async delBestMan(id){
        return $api.post(`/objects/delbest`, id)
    }
}