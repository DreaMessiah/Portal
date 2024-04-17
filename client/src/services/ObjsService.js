import $api from "../http"

export default class ObjsService{
    static async getObjs(){
        return $api.get(`/objects/getlistobjs`)
    }
    static async listObjsSV(){
        return $api.get(`/objects/viewobjs`)
    }
    static async insertObjs(obj_id){
        return $api.post(`/objects/insertobj`, {obj_id})
    }
    static async getAllTabels(search){
        return $api.post(`/objects/getalltabels`, search)
    }

    static async getTabelsForAll(search){
        return $api.post(`/objects/getforall`, search)
    }
    static async createTabels(tabel){
        return $api.post(`/objects/createtabel`, tabel)
    }
    static async getT13(params){
        return $api.post(`/objects/gett13`, params)
    }
    static async listTabelMans(params){
        return $api.post(`/objects/listtabel`, params)
    }
    static async getKTUdate(params){
        return $api.post(`/objects/getktudate`, params)
    }
    static async copyTab(params){
        return $api.post(`/objects/copytabel`, params)
    }
    static async delManTabel(params){
        return $api.post(`/objects/delmantabel`, params)
    }
    static async getUsersList(){
        return $api.get(`/objects/getuserslist`)
    }
    static async passObj(params){
        return $api.post(`/objects/passobj`, params)
    }
    static async dataOfObj(params){
        return $api.post(`/objects/usersobjs`, params)
    }





}