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
    // static messVoice(url){
    //     console.log(url)
    //     // return $api.post('/mess/offerpost',{content})
    //     return ''
    // }

    static messVoice(thisvoice,my_tn,friend_tn){ //,
        console.log(thisvoice.blob)

        if(thisvoice){
                const formData = new FormData()
                formData.append('blob', thisvoice.blob)
                formData.append('test', 'test')
                formData.append('tn_to', friend_tn)
                formData.append('tn_from', my_tn)
                return $api.post('/mess/pullvoice',formData)

        }else{
            return {err:false,message:'Файл не выбран'}
        }
    }

}
