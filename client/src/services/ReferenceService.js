import $api from "../http"

export default class ReferenceService{
    static async getWorks(){
        return $api.get('/reference/getworks')
    }
    static async getOgm(){
        return $api.get('/reference/getogm')
    }
    static async saveWorks(worksPrice){
        return $api.post('/reference/saveworks',{worksPrice})
    }
    static async saveOgm(ogmPrice){
        return $api.post('/reference/saveogm',{ogmPrice})
    }

    static async createWorks(work){
        return $api.post('/reference/createworks',{work})
    }
    static async createOgm(ogm){
        console.log(ogm)
        return $api.post('/reference/createogm',{ogm})
    }
    static async deleteWorks(id){
        return $api.post('/reference/deleteworks',{id})
    }
    static async deleteOgm(id){
        return $api.post('/reference/deleteogm',{id})
    }
    static async loadWorks(works){
        return $api.post('/reference/loadworks',{works})
    }
    static async loadOgm(ogms){
        return $api.post('/reference/loadogm',{ogms})
    }

}
