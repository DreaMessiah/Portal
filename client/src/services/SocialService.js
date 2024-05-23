import $api from "../http"

export default class SocialService{
    static async createProgram(program){
        return $api.post(`/sociality/createprogram`, program)
    }

    static async getProgram(){
        return $api.post(`/sociality/getprogram`)
    }

    static async updateProgram(program){
        return $api.post(`/sociality/updateprogram`, program)
    }

    static async delProgram(program){
        console.log(program)
        return $api.post(`/sociality/delprogram`, program)
    }

    static async getComission(){
        return $api.get(`/sociality/getcommission`)
    }

    static async plusComission(man){
        return $api.post(`/sociality/pluscommssion`, man)
    }

    static async delComission(man){
        return $api.post(`/sociality/delcommssion`, man)
    }


}
