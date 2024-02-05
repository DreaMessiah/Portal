import $api from "../http"

export default class WeldingService{
    static async getObjs(inn){
        return $api.post(`/welding/getlistobjs`, inn)
    }

}
