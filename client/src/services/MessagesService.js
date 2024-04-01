import $api from "../http"

export default class MessagesService{
    static async pushMess(mess){
        console.log(mess)
        return $api.post('/mess/messages',{mess})
    }

    static async getMess(chat){
        console.log(chat)
        return $api.post('/mess/getmess',{chat})
    }

    static async getMyChats(tn){
        return $api.post('/mess/getmychats',{tn})
    }

}
