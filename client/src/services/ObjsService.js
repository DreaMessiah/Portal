import $api from "../http"

export default class ObjsService{
    static async getObjs(inn){
        console.log(inn)
        return $api.post(`/objects/getlistobjs`, inn)
    }
}