import $api from "../http"

export default class WeldingService{
    static async getObjs(inn){
        return $api.post(`/welding/getlistobjs`, inn)
    }
    static async getCrew(){
        return $api.post(`/welding/getallcrew`)
    }
    static async getMyCrews(params){
        return $api.post(`/welding/getmycrews`, params)
    }
    static async getTabelSv(params){
        return $api.post(`/welding/gettabsv`, params)
    }
    static async createCrew(params){
        return $api.post(`/welding/createcrew`, params)
    }
    static async updateManDays(params){
        return $api.post(`/welding/updateman`, params)
    }
    static async getViewWorkSV(params){
        return $api.post(`/welding/getviewwork`, params)
    }
    static async plusVW(params){
        return $api.post(`/welding/plusvw`, params)
    }
    static async insertObjs(objs){
        return $api.post(`/welding/pushnewobjwelding`, objs)
    }
    static async listObjsSV(inn){
        return $api.post(`/welding/viewobjssv`, inn)
    }
    static async getYM(innAndId){
        return $api.post(`/welding/getym`, innAndId)
    }
    static async crYM(params){
        return $api.post(`/welding/crym`, params)
    }
    static async getObgForHook(id){
        return $api.post(`/welding/getobjhook`, id)
    }
    static async createZa(connections,year,month,object_id){
        return $api.post(`/welding/createza`, {connections,year,month,object_id})
    }

}
