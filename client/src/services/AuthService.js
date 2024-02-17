import $api from "../http"

export default class AuthService{
    static async login(login,password){
        return $api.post('/auth/login',{login,password})
    }
    static async registration(login,password,tn,full_name,id,email,inn,moderator,account,unit){
        return $api.post('/auth/registration',{tn,full_name,login,password,id,email,inn,moderator,account,unit})
    }
    static async logout(){
        return $api.post('/auth/logout')
    }
    static async get13(userid){
        return $api.post('/t13/get',{userid})
    }
    static async getusers(){
        return $api.get('/auth/get')
    }
}
