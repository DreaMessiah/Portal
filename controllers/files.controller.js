const FilesService = require('../service/files.service')
const {Files,User} = require('../models/models')
const FileDto = require('../dtos/fileDto')
class FilesController {
    async getFiles(req, res, next) {
        try {
            const {user_id} = req.body
            const files = await FilesService.get(user_id)

            if(!files.length) return res.status(200).json({message: 'У Вас нет файлов'})
            return res.status(200)//res.json(files)
        } catch (e) {
            next(e)
        }
    }
    async createDir(req,res,next) {
        try {
            const {user_id,name,type,parent_id = 0} = req.body

            const parentFile = await Files.findOne( {where:{id:parent_id}} )
            const file = new FileDto({user_id,name,type,parent_id})
            const newFile = await Files.create(file);

            if(!parentFile){
                file.path = name
                await FilesService.createDir(file)
            }else{
                const parent = new FileDto(parentFile)
                file.path = `${parent.path}\\${file.name}`
                await FilesService.createDir(file)
                parent.child_id.push(newFile.id)
                await parentFile.update(parent)
            }
            await newFile.update(file)

            return res.json(newFile)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new FilesController()