const fs = require('fs');
const config = require('config')
const {Files, StatementsSimples} = require('../models/models')
const ApiError = require("../exceptions/api.error");
const {Sequelize,Op} = require('sequelize')
const sharp = require("sharp");
const PATH = require('path');
const {logger} = require("sequelize/lib/utils/logger");

class FilesService {
    async get(id,parent,onbasket) {
        let dirs = []
        if(onbasket){
            dirs = await Files.findAll({where: {user_id:id,parent_id:parent,type:'dir',[Op.or]: [ { basket: onbasket },{ havebasket: onbasket } ]}})
        }else{
            dirs = await Files.findAll({where: {user_id:id,parent_id:parent,type:'dir',basket:false}})
        }
        const files = await Files.findAll({where: {user_id:id,parent_id:parent,type: { [Sequelize.Op.not]: 'dir' },basket:onbasket}})
        const list = [...dirs,...files]
        if (!list) throw ApiError.BadRequest('База с файлами пуста')
        return list
    }

    async getAll(id){
        const files = await Files.findAll({where: {user_id:id}})
        if (!files) throw ApiError.BadRequest('База с файлами пуста')
        return files
    }
    async getStatements() {
        return await StatementsSimples.findAll()
    }
    async createPath(parent,path = []){
        const file = await Files.findOne({where: {id:parent}})
        const allPath = [{parent:parent,name:file.name},...path]
        if(!file.parent_id) return allPath
        else{
            return this.createPath(file.parent_id,allPath)
        }
    }

    async compressResizeAndSaveImage(filePath,quality, width, height) {
        try {
            const buffer = await sharp(filePath).resize({ width, height, position: 'center' }).jpeg({ quality }).toBuffer()
            fs.writeFileSync(filePath, buffer, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                    return
                }
                sharp.cache(false)
                console.log('Изображение успешно сохранено.')
            })
        } catch (error) {
            console.error('Ошибка при сжатии, изменении размера и перезаписи изображения:', error)
        }
    }
    async compressProportionalImage(filePath, quality, maxWidth, maxHeight) {
        try {
            const image = sharp(filePath)
            const metadata = await image.metadata()
            const { width, height } = metadata

            let resizeOptions = {}
            if (width > height) {
                resizeOptions = { width: maxWidth }
            } else {
                resizeOptions = { height: maxHeight }
            }

            const buffer = await image.rotate().resize(resizeOptions).jpeg({ quality }).toBuffer()
            fs.writeFileSync(filePath, buffer, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err)
                    return;
                }
                sharp.cache(false)
                console.log('Изображение успешно сохранено.')
            });
        } catch (error) {
            console.error('Ошибка при сжатии, изменении размера и перезаписи изображения:', error);
        }
    }
    createDir(file){
        //const filePath = `${config.get('file_path')}\\${file.user_id}\\${file.path}`
        //const userPath = `${config.get('file_path')}\\${file.user_id}`

        const filePath = PATH.join(`${config.get('file_path')}`,`${file.user_id}`,`${file.path}`)
        const userPath = PATH.join(`${config.get('file_path')}`,`${file.user_id}`)

        console.log(filePath)

        console.log(userPath)

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
                return reject({message: 'Ошибка создания директории...'})
            }
        }))
    }
    async createPathTask(path){
        //const taskPath = `${config.get('file_path')}\\tasks\\${path}`
        const taskPath = PATH.join(`${config.get('file_path')}`,'tasks',`${path}`)

        if(!fs.existsSync(taskPath)){
            await fs.mkdir(taskPath, (err) => {
                if (err) {
                    console.error('Ошибка при создании папки:', err);
                    return;
                }
                console.log('Папка успешно создана.');
            })
        }
    }
    createPathUser(user){
        const folderPath = PATH.join(`${config.get('file_path')}`,`${user}`)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }
    generateRandomFileName() {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 10000);
        return `${timestamp}_${randomNumber}`;
    }

    async fileToTrash(id) {
        const file = await Files.findByPk(id)
        file.basket = true
        await file.save()
        return file
    }
    async fileFromTrash(id) {
        const file = await Files.findByPk(id)
        file.basket = false
        await file.save()
        return file
    }
}
module.exports = new FilesService()