import $api from "../http"

export default class ObjsService{
    static async getObjs(inn){
        console.log(inn)
        return $api.post(`/objects/getlistobjs`, inn)
    }

    static async listObjsSV(user){
        return $api.post(`/objects/viewobjs`, user)
    }

    static async insertObjs(obj){
        return $api.post(`/objects/insertobj`, obj)
    }

    static async getAllTabels(search){
        return $api.post(`/objects/getalltabels`, search)
    }

    static async createTabels(tabel){
        return $api.post(`/objects/createtabel`, tabel)
    }

    static async getT13(params){
        console.log(params)
        return $api.post(`/objects/gett13`, params)
    }

    static async listTabelMans(params){
        console.log(params)
        return $api.post(`/objects/listtabel`, params)
    }



}