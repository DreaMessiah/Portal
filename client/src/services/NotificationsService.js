import $api from "../http"

export default class NotificationsService {
    static async sendAll(message){
        return $api.post(`/notifications/sendall`, {message})
    }
    static async loadTypes(){
        return $api.get(`/notifications/loadtypes`)
    }
    static async createType(name,img){
        return $api.post(`/notifications/createtype`, {name,img})
    }
    static async removeType(id){
        return $api.post(`/notifications/removetype`, {id})
    }


}