const {Tasks,Priority, Objects, User, TaskGroups, TaskConnections, TaskChains, TaskDocs, Files, DiskSpace} = require('../models/models')
const ApiError = require('../exceptions/api.error')
const FilesService = require('./files.service')
const config = require("config");
const fs = require("fs");
const FileDto = require("../dtos/fileDto");

class TasksService{
    async getPriority() {
        const priorities = await Priority.findAll({ where: { type: 1},  order: [['id', 'ASC']] })
        if(!priorities) throw ApiError.BadRequest('Приоритеты не найдены')
        return priorities
    }
    async getObjects(inn) {
        const objects = await Objects.findAll({ where: { inn: inn},  order: [['shifr', 'ASC']] })
        if(!objects) throw ApiError.BadRequest('Обьекты не найдены')
        return objects
    }
    async getUsers(inn) {
        const users = await User.findAll({ where: { inn: inn},  order: [['full_name', 'ASC']] })
        if(!users) throw ApiError.BadRequest('Обьекты не найдены')
        return users
    }
    async getGroups() {
        const groups = await TaskGroups.findAll({ order: [['name', 'ASC']] })
        if(!groups) throw ApiError.BadRequest('Обьекты не найдены')
        return groups
    }
    async createGroup(name,group,creator_tn) {
        console.log(group)
        const item = await TaskGroups.findOne({where:{name:name}})
        if(!item) {
            return await TaskGroups.create({name, users_tn:group, creator_tn})
        }
        return {message:'Группа с таким именем уже существует'}
    }
    async deleteGroup(id){
        return await TaskGroups.destroy({where:{id:id}})
    }

    async createTask(name,text,creator_tn,expiration,priority_id,connection_value,filenames,group,user_id) {
        let connection
        if(connection_value){
           connection = await TaskConnections.create({obj:connection_value,type:1})
        }
        const task = await Tasks.create({name,text,creator_tn,expiration,status_id:1,priority_id,connection_id:connection ? connection.id : 0,trash:false})
        if(!task) throw ApiError.BadRequest('Задача не создана')

        const next = group.map(item => item.value)
        const chain = await TaskChains.create({task_id:task.id,user_tn:creator_tn,status_id:1,next:next})

        filenames.map( async (item) => {
            await FilesService.createPathTask(task.id).then( async () => {

                await this.replaceFile(item,task.id)
                await TaskDocs.create({filename:item,chain_id:chain.id,task_id:task.id})
            })
        })

        return {message:'Задача создана успешно'}
    }
    async replaceFile(file,task){
        try {
            fs.rename(`${config.get('file_path')}\\temp\\${file}`, `${config.get('file_path')}\\tasks\\${task}\\${file}`, (err) => {
                if (err) {
                    console.error('Ошибка при перемещении файла:', err);
                }
            });
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = new TasksService()

