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
    static async createZaSocial(za){
        return $api.post(`/sociality/createnewza`, za)
    }

    static async getMyZa(){
        return $api.get(`/sociality/getmyza`)
    }

    static async getAllZa(){
        return $api.get(`/sociality/getallza`)
    }

    static async downloadDoc(doc){
        return $api.post(`/sociality/downloaddoc`, doc,{responseType:'blob'})
    }

    static async reverStatus(st){
        return $api.post(`/sociality/reverstatus`, st)
    }

    static async makeProtocol(list){
        return $api.post(`/sociality/makeprotocol`, list)
    }

    static async getProtocols(sort,direction){
        return $api.post(`/sociality/getprotocols`,{sort,direction})
    }
    static async getStatuses(){
        return $api.get(`/sociality/getprotacolstatuses`)
    }


}
