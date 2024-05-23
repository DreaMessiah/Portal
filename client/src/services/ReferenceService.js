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
    static async setT13(t13){
        return $api.post('/reference/sett13',{t13})
    }

    static async setPayslip(payslip){
        return $api.post('/reference/setpayslip',{payslip})
    }

    static async getKtuDocs(){
        return $api.get('/reference/getktudocs')
    }
    static async newKtuDoc(month,year,comment){
        return $api.post('/reference/newktudoc',{month,year,comment})
    }
    static async delKtuDoc(id){
        return $api.post('/reference/delktudoc',{id})
    }
    static async fetchKtus(id){
        return $api.post('/reference/getktus',{id})
    }
    static async saveKtus(id,ktus){
        return $api.post('/reference/savektus',{id,ktus})
    }
    static async delKtus(id){
        return $api.post('/reference/delktus',{id})
    }

}
