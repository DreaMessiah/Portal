import $api from "../http"
import UserService from "./UserService";

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
        return $api.post('/mess/sendmessage',{tn,text})
    }
    static offerPost(content){
        return $api.post('/mess/offerpost',{content})
    }
    // static messVoice(url){
    //     console.log(url)
    //     // return $api.post('/mess/offerpost',{content})
    //     return ''
    // }

    static messVoice(thisvoice,my_tn,friend_tn){
        if(thisvoice){
                const formData = new FormData()
                formData.append('blob', thisvoice.blob)
                formData.append('tn_to', friend_tn)
                formData.append('tn_from', my_tn)
                return $api.post('/mess/pullvoice',formData)

        }else{
            return {err:false,message:'Файл не выбран'}
        }
    }
//******************************************************//
    static createChat(user,group,name,image){
        return $api.post('/mess/createchat', {user,group,name,image})
    }
    static getMessages(chat){
        return $api.post('/mess/getmessages', {chat})
    }
    static getChats(){
        return $api.get('/mess/getchats')
    }
    static iSee(id){
        return $api.post('/mess/isee',{id})
    }


    static sendChatMessage(message,user,group,chat,files,audio=null){
        const formData = new FormData()
        formData.append('blob', audio)
        formData.append('user', JSON.stringify(user) )
        formData.append('group', JSON.stringify(group) )
        formData.append('files', JSON.stringify(files) )
        formData.append('chat', JSON.stringify(chat) )
        formData.append('message', message )
        return $api.post('/mess/sendchatmessage',formData)
    }

    static loadAvatarImage(file){
        if(file){
            if(UserService.isImage(file.name)){
                const formData = new FormData()
                formData.append('file', file)
                formData.append('filename', file.name)
                return $api.post('/mess/loadgroupavatar',formData)
            }else{
                return {err:true,message:'Файл не является изображением'}
            }
        }else{
            return {err:false,message:'Файл не выбран'}
        }
    }



}
