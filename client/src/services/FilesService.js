import $api from "../http"

export default class FilesService{
    static fetchFiles(user_id){
        return $api.post('/files/get',{ user_id })
    }
    static createDir(user_id,name,type,parent_id){
        return $api.post('/files/dir',{ user_id,name,type,parent_id })
    }
}
