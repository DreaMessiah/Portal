const TasksService = require('../service/tasks.service')
const ApiError = require('../exceptions/api.error')
class TasksController {
    async getPriority(req,res,next) {
        try{
            const priorities = await TasksService.getPriority()
            return res.status(200).json(priorities)
        }catch (e){
            next(e)
        }
    }
    async getObjects(req,res,next) {
        try{
            const objects = await TasksService.getObjects(req.user.inn)
            const newObjs = objects.map( item => {
                return {shifr:item.shifr,value:item.shifr,label:`${item.shifr} / ${item.nameobject}`}
            })
            return res.status(200).json(newObjs)
        }catch (e){
            next(e)
        }
    }
    async getUsers(req,res,next) {
        try{
            const users = await TasksService.getUsers(req.user.inn)
            const newUsers = users.map( item => {
                return {id:item.id,value:item.tn,label:`${item.full_name } / ${item.developer || ''}`}
            })
            return res.status(200).json(newUsers)
        }catch (e){
            next(e)
        }
    }
    async getGroups(req,res,next) {
        try{
            const groups = await TasksService.getGroups()
            return res.status(200).json(groups)
        }catch (e){
            next(e)
        }
    }
    async createGroup(req,res,next) {
        try{
            const {name,group} = req.body
            const tns = group.map(obj => obj.value);
            const created = await TasksService.createGroup(name,tns,req.user.tn)
            return res.status(200).json(created)
        }catch (e){
            next(e)
        }
    }
    async createTask(req,res,next) {
        try{
            const {name,text,exp,prio,obj,filenames,group} = req.body
            const task = await TasksService.createTask(name,text,req.user.tn,exp,prio.id,obj.shifr,filenames,group,req.user.id)
            return res.status(200).json(task)
        }catch (e){
            next(e)
        }
    }

    async deleteGroup(req,res,next) {
        try{
            const {id} = req.body
            const deleted = await TasksService.deleteGroup(id)
            return res.status(200).json(deleted)
        }catch (e){
            next(e)
        }
    }


}
module.exports = new TasksController()