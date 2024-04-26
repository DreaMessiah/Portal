import $api from "../http"

export default class WeldingService{
    static async getObjs(inn){
        return $api.post(`/welding/getlistobjs`, inn)
    }
    static async getCrew(){
        return $api.post(`/welding/getallcrew`)
    }
    static async createNewCrew(crew,group){
        return $api.post(`/welding/createnewcrew`,{crew,group})
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
    static async fetchZasv(object_id,month,year){
        return $api.post(`/welding/getzasv`, {year,month,object_id})
    }
    static async createZa(connections,year,month,object_id){
        return $api.post(`/welding/createza`, {connections,year,month,object_id})
    }
    static async fetchStatuses(type,unit){
        return $api.post(`/welding/getstatus`, {type,unit})
    }
    static async changeStatus(za_id,stat_id){
        return $api.post(`/welding/changestat`, {za_id,stat_id})
    }
    static async deleteZa(za_id) {
        return $api.post(`/welding/deleteza`, {za_id})
    }
    static async fetchConnections(za_id) {
        return $api.post(`/welding/getconn`, {za_id})
    }
    static async saveConnections(connections) {
        return $api.post(`/welding/saveconn`, {connections})
    }
    static async addMan(man) {
        return $api.post(`/welding/addweldman`, {man})
    }
    static async deleteMan(id) {
        return $api.post(`/welding/deleteman`, {id})
    }
    static async loadMansToCrew(id) {
        return $api.post(`/welding/loadmanstocrew`, {id})
    }
    static async loadCrewData(id) {
        return $api.post(`/welding/loadcrewdata`, {id})
    }
    static async saveCrewMans(id,group) {
        return $api.post(`/welding/savecrewmans`, {id,group})
    }
    static async getCrewForObject(param) {
        return $api.post(`/welding/getlistcrew`, {param})
    }
    static async delCrewForObject(param) {
        return $api.post(`/welding/delcrewobj`, {param})
    }
    static async plusCrewOnObj(crew) {
        return $api.post(`/welding/pluscrewonobj`, {crew})
    }
    static async summFactDays(object) {
        return $api.post(`/welding/summitogy`, {object})
    }
    static async setWorksTypes(types) {
        return $api.post(`/welding/setworkstypes`, {types})
    }



}
