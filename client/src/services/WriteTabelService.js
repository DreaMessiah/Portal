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

    static async blockedTabel(params){
        return $api.post(`/tabel/blocked`, params)
    }

    static async getItogy(params){
        return $api.post(`/tabel/itogy`, params)
    }

    static async trashYm(id){
        return $api.post(`/tabel/trashym`, id)
    }


}