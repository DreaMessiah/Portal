const FilesService = require('../service/files.service')
const {Files,User, DiskSpace} = require('../models/models')
const fs = require('fs');
const FileDto = require('../dtos/fileDto')
const config = require('config')

class FilesController {
    async getFiles(req, res, next) {
        try {
            const {user_id,parent_id} = req.body
            const files = await FilesService.get(user_id,parent_id)
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
                file.path = `${parentFile.path}\\${file.name}`
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
            return res.json(file)
        } catch (e) {
            next(e)
        }
    }

    async uploadFile(req, res, next) {
        try {
            //slave 5 mb
            const file = req.files.file
            const parent = await Files.findOne({where:{user_id:req.body.user_id,id:req.body.parent}})
            const sizes = await DiskSpace.findOne({where:{user_id:req.body.id}})

            if(!sizes) return res.status(200).json({message: 'Ошибка файлового хранилища'})
            if(sizes.usedspace + file.size > sizes.diskspace) return res.status(400).json({message: 'Не достаточно места на диске'})

            sizes.usedspace = sizes.usedspace + file.size
            sizes.save()

            let path
            if(parent){
                path = `${config.get('file_path')}\\${sizes.user_id}\\${parent.path}\\${file.name}`
            }else {
                path = `${config.get('file_path')}\\${sizes.user_id}\\${file.name}`
            }

            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }

            await file.mv(path)

            const type = file.name.split('.')

            const fileDto = new FileDto({name:file.name,type,size:file.size,path:parent ? parent.path : '',user_id:sizes.user_id,parent_id: parent ? parent.id : 0})
            const newFile = await Files.create(fileDto)

            return res.status(200).json(newFile)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new FilesController()