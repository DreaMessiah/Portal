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

    static async createTabels(tabel){
        return $api.post(`/objects/createtabel`, tabel)
    }
    static async getT13(params){
        return $api.post(`/objects/gett13`, params)
    }
    static async listTabelMans(params){
        console.log(params)
        return $api.post(`/objects/listtabel`, params)
    }



}