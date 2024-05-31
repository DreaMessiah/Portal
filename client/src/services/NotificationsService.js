import $api from "../http"

export default class NotificationsService {
    static async sendAll(message){
        return $api.post(`/notifications/sendall`, {message})
    }

}