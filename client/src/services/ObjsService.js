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

    static async getAllTabels(inn){
        return $api.post(`/objects/getalltabels`, inn)
    }

}