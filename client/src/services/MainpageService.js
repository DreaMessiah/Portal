import $api from "../http"

export default class MainpageService {
    static async pushBestMan(man){
        console.log(man)
        return $api.post(`/objects/bestman`, man)
    }

    static async viewBestMan(inn){
        console.log(inn)
        return $api.post(`/objects/viewbest`, inn)
    }

    static async delBestMan(id){
        console.log(id)
        return $api.post(`/objects/delbest`, id)
    }
}