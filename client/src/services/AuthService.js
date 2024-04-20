import $api from "../http"

export default class AuthService{
    static async login(login,password){
        return $api.post('/auth/login',{login,password})
    }
    static async registration(login,password,tn,full_name,email,inn,moderator,account,unit){
        return $api.post('/auth/registration',{tn,full_name,login,password,email,inn,moderator,account,unit})
    }
    static async createUser(login,password,tn,full_name,developer){
        return $api.post('/auth/createuser',{tn,full_name,login,password,developer})
    }
    static async setFz152(tn){
        return $api.post('/auth/setfz152',{tn})
    }
    static async logout(){
        return $api.post('/auth/logout')
    }
    static async tnenter(tn){
        return $api.post('/auth/tnenter',{tn})
    }
    static async get13(userid){
        return $api.post('/t13/get',{userid})
    }
    static async getusers(){
        return $api.get('/auth/get')
    }
}
