import $api from "../http"

export default class PhonesService{
    static add(name,mobile_phone,city_phone,ats,email,position,job,order,heading){
        return $api.post('/phones/add',{name,mobile_phone,city_phone,ats,email,position,job,order,heading})
    }
    static fetchPhones(){
        return $api.get('/phones/get')
    }
    static changePhones(id,name,mobile_phone,city_phone,ats,email,position,job,order){
        return $api.post('/phones/change',{id,name,mobile_phone,city_phone,ats,email,position,job,order})
    }
    static deletePhones(id){
        return $api.post('/phones/delete',{id})
    }
}
