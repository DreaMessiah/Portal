import $api from "../http"

export default class WeldingService{
    static async getObjs(inn){
        return $api.post(`/welding/getlistobjs`, inn)
    }

    static async insertObjs(objs){
        return $api.post(`/welding/pushnewobjwelding`, objs)
    }

    static async listObjsSV(inn){
        return $api.post(`/welding/viewobjssv`, inn)
    }

}
