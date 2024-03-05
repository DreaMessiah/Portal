const FilesService = require('../service/files.service')
const {Files,User} = require('../models/models')
const FileDto = require('../dtos/fileDto')
const {logger} = require("sequelize/lib/utils/logger");
class FilesController {
    async getFiles(req, res, next) {
        try {
            const {user_id,parent_id} = req.body
            const files = await FilesService.get(user_id,parent_id)

            if(!files.length) return res.status(200).json({message: 'У Вас нет файлов'})
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
                const newFile = await Files.create(file);
                if (!parentFile.child_id) parentFile.child_id = [];
                parentFile.child_id.push(newFile.id);
                const childs = parentFile.child_id
                parentFile.child_id = null
                await parentFile.save();
                parentFile.child_id = childs
                await parentFile.save();

                await newFile.update(file)
            }
            return res.json(file)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new FilesController()