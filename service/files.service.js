const fs = require('fs');
const config = require('config')
const {Files} = require('../models/models')
const ApiError = require("../exceptions/api.error");
const {Sequelize} = require('sequelize')
class FilesService {
    async get(id,parent) {
        const dirs = await Files.findAll({where: {user_id:id,parent_id:parent,type:'dir'}})
        const files = await Files.findAll({where: {user_id:id,parent_id:parent,type: { [Sequelize.Op.not]: 'dir' }}})
        const list = [...dirs,...files]
        if (!list) throw ApiError.BadRequest('База с файлами пуста')
        return list
    }
    async getAll(id){
        const files = await Files.findAll({where: {user_id:id}})
        if (!files) throw ApiError.BadRequest('База с файлами пуста')
        return files
    }
    async createPath(parent,path = []){
        const file = await Files.findOne({where: {id:parent}})
        console.log('parent',file.parent_id)
        const allPath = [{parent:parent,name:file.name},...path]
        if(!file.parent_id) return allPath
        else{
            return this.createPath(file.parent_id,allPath)
        }
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