import $api from "../http"

export default class MessagesService{
    static async pushMess(mess){
        return $api.post('/mess/messages',{mess})
    }
    static async getMess(chat){
        return $api.post('/mess/getmess',{chat})
    }

    static async getMyChats(tn){
        return $api.post('/mess/getmychats',{tn})
    }

    static async searchMess(tn){
        return $api.post('/mess/searchmess',{tn})
    }
    static sendMessage(tn,text){
        console.log(tn)
        return $api.post('/mess/sendmessage',{tn,text})
    }
    static offerPost(content){
        console.log(content)
        return $api.post('/mess/offerpost',{content})
    }

}
