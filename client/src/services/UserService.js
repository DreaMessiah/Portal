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

}