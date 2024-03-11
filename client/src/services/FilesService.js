import $api from "../http"

export default class FilesService{
    static fetchFiles(user_id,parent_id){
        return $api.post('/files/get',{ user_id,parent_id })
    }
    static createDir(user_id,name,type,parent_id){
        return $api.post('/files/dir',{ user_id,name,type,parent_id })
    }
    static fetchAllFiles(user_id){
        return $api.post('/files/getall',{ user_id })
    }
    static getPath(parent){
        return $api.post('/files/getpath',{ parent })
    }

    static uploadFile(file,user_id,parent_id,onUploadProgress ){
        const formData = new FormData()
        formData.append('file', file)
        formData.append('parent', parent_id)
        formData.append('user', user_id)
        formData.append('filename', file.name)

        if(file.size > 2147483648) return {message: 'Слишком большой размер брат.'}

        return $api.post('/files/upload',formData,{
            onUploadProgress: onUploadProgress
        })
    }
}
