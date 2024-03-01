const fs = require('fs');
const config = require('config')
const {Files} = require('../models/models')
const ApiError = require("../exceptions/api.error");

class FilesService {
    async get(id,parent) {
        const files = await Files.findAll({where: {user_id:id,parent_id:parent}})
        console.log(files)
        if (!files) throw ApiError.BadRequest('База с файлами пуста')
        // const phonesDto = new PhonesDto(book)
        // console.log(book)
        return files
    }
    createDir(file){
        const filePath = `${config.get('file_path')}\\${file.user_id}\\${file.path}`
        const userPath = `${config.get('file_path')}\\${file.user_id}`

        return new Promise(((resolve,reject) => {
            try{
                if(!fs.existsSync(userPath)) fs.mkdirSync(userPath)
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    console.log('Файл успешно добавлен')
                    return resolve({message:'Файл успешно добавлен'})
                }else reject({message: 'Файл уже существует'})
            }catch (e) {
                console.log('Ошибка создания директории...')
                return reject({messsage: 'Ошибка создания директории...'})
            }
        }))
    }
}
module.exports = new FilesService()