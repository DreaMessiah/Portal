import $api from "../http"

export default class WriteTabelService {

    static async myObj(id){
        return $api.post(`/tabel/thisobj`, id)
    }
    static async plusMan(man){
        return $api.post(`/tabel/plusman`, man)
    }
    static async editDay(day){
        return $api.post(`/tabel/editday`, day)
    }

    static async getTransport(inn){
        return $api.post(`/tabel/transpotprice`, inn)
    }

    static async getThisTabel(params){
        return $api.post(`/tabel/thistabel`, params)
    }


    // static async insertObjs(objs){
    //     return $api.post(`/welding/pushnewobjwelding`, objs)
    // }
    //
    // static async listObjsSV(inn){
    //     return $api.post(`/welding/viewobjssv`, inn)
    // }
    //
    // static async getYM(innAndId){
    //     return $api.post(`/welding/getym`, innAndId)
    // }
    //
    // static async crYM(params){
    //     console.log(params)
    //     return $api.post(`/welding/crym`, params)
    //
    // }
    //
    // static async getObgForHook(id){
    //     return $api.post(`/welding/getobjhook`, id)
    // }

}