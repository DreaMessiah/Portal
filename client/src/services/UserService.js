import $api from "../http";
export default class UserService {
    static fetch() {
        return $api.get('/posts/get')
    }
    static loadAvatar(file){
        if(file){
            if(this.isImage(file.name)){
                const formData = new FormData()
                formData.append('file', file)
                formData.append('filename', file.name)
                return $api.post('/auth/setavatar',formData)
            }else{
                return {err:true,message:'Файл не является изображением'}
            }
        }else{
            return {err:false,message:'Файл не выбран'}
        }
    }
    static changePassword(oldPass,newPass){
        return $api.post('/auth/changepass', {oldPass,newPass})
    }
    static isImage(filename) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // расширения изображений
        const extension = filename.split('.').pop().toLowerCase(); // получаем расширение файла и приводим его к нижнему регистру
        return imageExtensions.includes(extension); // возвращаем true, если расширение файла соответствует расширениям изображений
    }
    static fetchActiualT13() {
        return $api.get('/t13/getactual')
    }
    static getWorkers() {
        return $api.get('/t13/getworkers')
    }
    static getUnregWorkers() {
        return $api.get('/t13/getunreg')
    }

    static getUni() {
        return $api.get('/t13/getuni')
    }
    static getStat() {
        return $api.get('/auth/getstat')
    }
    static getStatUsers(sort) {
        return $api.post('/auth/getusers',{sort})
    }
    static getBranchs() {
        return $api.get('/t13/getbranchs')
    }
    static sendBye(termText,selected) {
        return $api.post('/auth/bye',{termText,selected})
    }
    static isbye() {
        return $api.get('/auth/isbye')
    }
    static getStructure() {
        return $api.get('/t13/getstructure')
    }
    static createStructure(struct) {
        return $api.post('/t13/createstructure',{struct})
    }
    static changeContact(worker,onContacts,contacts){
        return $api.post('/t13/changecontact',{worker,onContacts,contacts})
    }
    static fetchWorkersBranch(branch) {
        return $api.post('/t13/getworkersbranch',{branch})
    }
    static deleteBranch(branch) {
        return $api.post('/t13/deletebranch',{branch})
    }
    static sendHrm(report) {
        return $api.post('/t13/sendhrm',{report})
    }
    static checkHrm() {
        return $api.get('/t13/checkhrm')
    }
    static getHrmAnswers() {
        return $api.get('/t13/gethrmanswers')
    }
    static getContacts(name){
        return $api.post('/t13/getcontacts',{name})
    }
    static getBlack(){
        return $api.get('/t13/getblack')
    }
    static changeBlack(list){
        return $api.post('/t13/changeblack',{list})
    }
    static getByeAnswers(m,y){
        return $api.get('/t13/getbyeanswers')
    }
    static getTermUsers(){
        return $api.get('/t13/getterm')
    }
    static getNewPeoples(){
        return $api.get('/t13/getnewusers')
    }
    static getSizes(){
        return $api.get('/auth/getsizes')
    }
    static setSizes(sizes){
        return $api.post('/auth/setsizes',{sizes})
    }
    static createPreReg(user){
        return $api.post('/auth/createreg',{user})
    }
    static changeZa(user){
        return $api.post('/auth/changeza',{user})
    }

    static removeZa(id){
        return $api.post('/auth/removeza',{id})
    }
    static getPrereg(){
        return $api.get('/auth/getreg')
    }
    static async register(full_name,login,password,email,phone,avatar){
        return $api.post('/auth/fixregister',{full_name,login,password,email,phone,avatar})
    }
    static getUnphotoWorkers(){
        return $api.get('/auth/getunphoto')
    }
    static setAvaFix(worker,avatar){
        return $api.post('/auth/setfixava',{worker,avatar})
    }

    static getAllPeoples(){
        return $api.get('/t13/getallpeoples')
    }
    static getUsers(){
        return $api.get('/auth/getusers')
    }



}