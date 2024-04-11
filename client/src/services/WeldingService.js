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
    // getTabelSv
    static async getTabelSv(params){
        return $api.post(`/welding/gettabsv`, params)

    }

    static async createCrew(params){
        return $api.post(`/welding/createcrew`, params)

    }

    static async updateManDays(params){
        console.log(params)
        return $api.post(`/welding/updateman`, params)

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
        console.log('getObgForHook')
        console.log(id)
        return $api.post(`/welding/getobjhook`, id)
    }

}
