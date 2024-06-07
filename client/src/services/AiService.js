import $api from "../http"

export default class AiService {
    static async sendMessage(message) {
        return $api.post('/ai/send', {message})
    }
}