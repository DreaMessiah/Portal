const FilesService = require('../service/files.service')
const {Files,User, DiskSpace, StatementsSimples} = require('../models/models')
const fs = require('fs');
const FileDto = require('../dtos/fileDto')
const config = require('config')
const PATH = require('path')
const HistoryService = require("../service/history.service")

class FilesController {
    async getAllFiles(req, res, next) {
        try {
            const {user_id} = req.body
            const files = await FilesService.getAll(user_id)
            if(!files) return res.status(200).json({message: 'У Вас нет файлов'})
            return res.status(200).json(files)
        } catch (e) {
            next(e)
        }
    }
    async getFiles(req, res, next) {
        try {
            const {user_id,parent_id,onbasket} = req.body
            const files = await FilesService.get(user_id,parent_id,onbasket)
            if(!files) return res.status(200).json({message: 'У Вас нет файлов'})
            return res.status(200).json(files)
        } catch (e) {
            next(e)
        }
    }

    async createDir(req,res,next) {
        try {
            const {user_id,name,type,parent_id = 0} = req.body

            const parentFile = await Files.findOne( {where:{id:parent_id}} )
            const file = new FileDto({user_id,name,type,parent_id})
            if(!parentFile){
                file.path = name
                await FilesService.createDir(file)
                await Files.create(file);
            }else{
                //const parent = new FileDto(parentFile)
                //file.path = `${parentFile.path}\\${file.name}`
                file.path = PATH.join(`${parentFile.path}`,`${file.name}`)
                await FilesService.createDir(file)
                const newFile = await Files.create(file)
                if (!parentFile.child_id) parentFile.child_id = []
                parentFile.child_id.push(newFile.id)
                const childs = parentFile.child_id
                parentFile.child_id = null
                await parentFile.save()
                parentFile.child_id = childs
                await parentFile.save()
                await newFile.update(file)
            }
            await HistoryService.createAction(req.user.id,3,`Создание директории в файловом хранилище: ${file.path}`)
            return res.json(file)
        } catch (e) {
            next(e)
        }
    }
    async uploadFile(req, res, next) {
        try {
            //slave 5 mb
            const file = req.files.file
            const filename = req.body.filename
            const par = req.body.parent
            const user = req.body.user

            const parent = await Files.findOne({where:{user_id:user,id:par}})
            const sizes = await DiskSpace.findOne({where:{user_id:user}})

            if(!sizes) {
                await HistoryService.createAction(req.user.id,3,`Ошибка файлового хранилища`,1)
                return res.status(200).json({message: 'Ошибка файлового хранилища'})
            }
            if(+sizes.usedspace + file.size > sizes.diskspace) {
                await HistoryService.createAction(req.user.id,3,`Не достаточно места на диске`,1)
                return res.status(400).json({message: 'Не достаточно места на диске'})
            }

            let path
            if(parent){
                path = PATH.join(config.get('file_path'),`${sizes.user_id}`,`${parent.path}`, `${filename}`);
                //path = `${config.get('file_path')}\\${sizes.user_id}\\${parent.path}\\${filename}`
            }else {
                path = PATH.join(config.get('file_path'),`${sizes.user_id}`, `${filename}`);
                //path = `${config.get('file_path')}\\${sizes.user_id}\\${filename}`
            }
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)
            const type = filename.split('.').pop()
            const fileDto = new FileDto({name:filename,type,size:file.size,path: parent ? parent.path : '',user_id:sizes.user_id,parent_id: parent ? parent.id : 0})
            const newFile = await Files.create(fileDto)

            sizes.usedspace = +sizes.usedspace + file.size
            sizes.save()

            await HistoryService.createAction(req.user.id,3,`Загрузка файла в облачное хранилище: ${path}`)
            return res.status(200).json(newFile)
        } catch (e) {
            next(e)
        }
    }
    async uploadFileDefault(req, res, next) {
        try {
            const file = req.files.file
            const filename = req.body.filename
            const path = PATH.join(config.get('file_path'), 'temp', `${filename}`);
            await file.mv(path)
            const type = filename.split('.').pop()
            await HistoryService.createAction(req.user.id,3,`Загрузка временного файла`,2)
            return res.status(200).json(file)
        } catch (e) {
            next(e)
        }
    }
    async deleteFileDefault(req, res, next) {
        try {
            const {name} = req.body
            const path = PATH.join(config.get('public_path'), 'temp', `${name}`);
            fs.unlink(path,(err) => {
                if (err) {
                    return res.status(200).json({message:`Ошибка при удалении файла: ${err}`})
                }
                return res.status(200).json({message:'файл удален'})
            })
        } catch (e) {
            next(e)
        }
    }
    async loadImg(req, res, next){
        try {
            const file = req.files.file
            const path_service = req.body.path ? req.body.path : 'news'
            console.log(req.body.path)
            const newname = FilesService.generateRandomFileName()
            const type = file.name.split('.').pop()
            const path = PATH.join(config.get('public_path'), path_service, 'images', `${newname}.${type}`);
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)
            await FilesService.compressProportionalImage(path,80, 1280, 720)
            await HistoryService.createAction(req.user.id,3,`Загрузка изображения для новостей или опросов`,2)
            return res.status(200).json({path:`${newname}.${type}`})
        }catch (e) {
            next(e)
        }
    }
    async loadAvatarImg(req, res, next){
        try {
            const file = req.files.file
            const newname = FilesService.generateRandomFileName()
            const type = file.name.split('.').pop()
            const path = PATH.join(config.get('public_path'), 'profile', `${newname}.${type}`);
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)
            const filepath = await FilesService.compressProportionalAvatar(path,80, 1280, 720)
            await HistoryService.createAction(req.user.id,3,`Загрузка аватарки`)
            return res.status(200).json({path:filepath})
        }catch (e) {
            next(e)
        }
    }



    async loadPollsImg(req, res, next){
        try {
            const file = req.files.file

            const newname = FilesService.generateRandomFileName()
            const type = file.name.split('.').pop()
            const path = PATH.join(config.get('public_path'), 'polls', `${newname}.${type}`);
            //const path = `${config.get('public_path')}polls\\${newname}.${type}`

            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            await file.mv(path)

            await FilesService.compressProportionalImage(path,80, 1280, 720)

            await HistoryService.createAction(req.user.id,3,`Загрузка изображения для новостей или опросов`,2)
            return res.status(200).json({path:`${newname}.${type}`})
        }catch (e) {
            next(e)
        }
    }
    async getPath(req, res, next){
        try {
            const {parent} = req.body
            if(+parent){
                const path = await FilesService.createPath(+parent)
                if(!path) return res.status(200).json({message: 'Ошибка сбора пути'})
                return res.status(200).json(path)
            }
            return res.status(200).json([])
        } catch (e) {
            next(e)
        }
    }
    async delete(req,res,next) {
        try {
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }
    async getStatements(req,res,next) {
        try {
            const statements = await FilesService.getStatements()
            return res.status(200).json(statements)
        } catch (e) {
            next(e)
        }
    }
    async downloadStatement(req,res,next){
        try{
            const {id} = req.body
            const statement = await StatementsSimples.findOne({where:{id:id}})
            if(!statement) return res.status(400).json({message: 'Файл не найден'})
            const path = PATH.join(`${config.get('public_path')}`,'statements',`${statement.file}`)
            if(fs.existsSync(path)){
                await HistoryService.createAction(req.user.id,3,`Загрузка шаблона заявления ${statement.file}`,0)
                return res.download(path,statement.file)
            }
            return res.status(400).json({message: 'Файл не найден'})
        }catch (e) {
            next(e)
        }
    }
    async downloadFile(req,res,next){
        try{
            const {id} = req.body
            const file = await Files.findByPk(id)
            if(!file) return res.status(400).json({message: 'Файл не найден'})
            if(file.type !== 'dir'){
                const path = PATH.join(`${config.get('public_path')}`,`${req.user.id}`,`${file.dataValues.name}`)
                if(fs.existsSync(path)){
                    await HistoryService.createAction(req.user.id,3,`Загрузка файла из облайного хранилица ${file.dataValues.name}`,0)
                    return res.download(path,file.dataValues.name)
                }
            }
            return res.status(400).json({message: 'Файл не найден'})
        }catch (e) {
            next(e)
        }
    }

    async fileToTrash(req,res,next) {
        try {
            const file = FilesService.fileToTrash(req.body.id)
            return res.status(200).json(file)
        } catch (e) {
            next(e)
        }
    }
    async fileFromTrash(req,res,next) {
        try {
            const file = FilesService.fileFromTrash(req.body.id)
            return res.status(200).json(file)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new FilesController()