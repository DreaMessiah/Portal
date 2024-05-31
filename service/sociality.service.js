const {ProgramOfSoc, t13uni, User, Commission, TaskConnections, Tasks, TaskChains, TaskDocs, MyProgram} = require('../models/models')
const PATH = require("path");
const config = require("config");
const fs = require("fs");
const ApiError = require("../exceptions/api.error");
const FilesService = require("./files.service");
class SocialityService{
    async getProgram(){
        const listProgram = await ProgramOfSoc.findAll()
        return listProgram
    }
    async createProgram(program){
        console.log(program)
        return await ProgramOfSoc.create({
            name: program.name,
            description: program.description,
            conditions: program.conditions,
            docs: program.files,
            experience: program.experience,
            sum: program.sum,
            purpose: program.purpose,
            calculation: program.calculation
        })
    }

    async updateProgram(program){


        const thisprogram = await ProgramOfSoc.findOne({where:{id:program.id}})
        console.log(thisprogram)
        thisprogram.name = program.name
        thisprogram.description = program.description
        thisprogram.conditions = program.conditions
        thisprogram.docs = program.docs
        thisprogram.experience = program.experience
        thisprogram.sum = program.sum
        thisprogram.purpose = program.purpose
        thisprogram.calculation = program.calculation
        await thisprogram.save();
        return ''
    }
    async delProgram(program) {
        const deleted = await ProgramOfSoc.findByPk(program.iddel)
        console.log(deleted)
        if(deleted){
            await deleted.destroy()
            return {del:true,message:'Программа удалена'}
        }
        return {del:false,message:'Проблема удаления'}
    }
    async getComission(){
        const listMans = await Commission.findAll({ include: ['t13uni','user'] })
        return listMans
    }
    async plusComission(man){
        console.log(man)
        return await Commission.create({
            possion: man.possion,
            user_tn: man.tn
        })
    }
    async delComission(man) {
        const deleted = await Commission.findByPk(man.id)
        console.log(deleted)
        if(deleted){
            await deleted.destroy()
            return {del:true,message:'Член комиссии удален'}
        }
        return {del:false,message:'Проблема удаления'}
    }
    // createPathSocial
    async createZaSocial(za) {
        console.log(za)
        // MyProgram
    // async createZaSocial(name,text,creator_tn,expiration,priority_id,connection_value,filenames,group,user_id) {
    //     let connection
    //     if(connection_value){
    //         connection = await TaskConnections.create({obj:connection_value,type:1})
    //     }



        const task = await MyProgram.create({user_tn: za.user.tn, program: za.za.id, docs: za.files, commission: za.commission, boss_tn: za.capitan.tn, stazh: za.stazh.year})
        if(!task) throw ApiError.BadRequest('Задача не создана')
        //
        // const next = group.map(item => item.value)
        // const chain = await TaskChains.create({task_id:task.id,user_tn:creator_tn,status_id:1,next:next})
        //
        za.files.map( async (item) => {
            await FilesService.createPathSocial(za.za.id).then( async () => {
                await this.replaceFile(item.docname,za.za.id)
                // await TaskDocs.create({filename:item,chain_id:chain.id,task_id:task.id})
            })
        })

        //
        return task
    }

    async replaceFile(file,za){
        console.log('THIS FOLDER --------------- ' + za)
        try {
            fs.rename(`${config.get('file_path')}\\temp\\${file}`, `${config.get('file_path')}\\social\\${za}\\${file}`, (err) => {
                if (err) {
                    console.error('Ошибка при перемещении файла:', err);
                }
            });
        }catch (e) {
            console.log(e)
        }
    }
    async getMyZa(user){
        console.log(user)
        const listMans = await MyProgram.findAll({
            where: { user_tn: user.tn },
            include: ['programofsoc', 'user']

        })
        return listMans
    }
    async getAllZa(){
        const listMans = await MyProgram.findAll({include: ['programsofsoc', 'user' ]})
        return listMans
    }


    async reverStatus(st){
        console.log('--------------------------- ВОТ')
        const thisza = await MyProgram.findOne({where: {id: st.thisza.id}})



        const newcommission = []



        thisza.commission.forEach(man=>{
            const newman = man
            if(newman.user_tn === st.user){
                console.log(newman.user_tn)
                console.log(newman)
                newman.status = st.status
                newman.comment = st.comment
            }
            newcommission.push(newman)
        })
        console.log(newcommission)
        // thisza.commission = []
        // await thisza.save()
        // thisza.commission = newcommission
        // await thisza.save()
        // const prev = await Struct.findByPk(struct.toNext.id)
        // thisza.set('commission', [...newcommission])
        // await thisza.save()
        //const thisza2 = await MyProgram.findOne({where: {id: st.thisza.id}})
        //console.log(thisza2.commission)
        return ''

        // const thisprogram = await ProgramOfSoc.findOne({where:{id:program.id}})
        // console.log(thisprogram)
        // thisprogram.name = program.name
        // thisprogram.description = program.description
        // thisprogram.conditions = program.conditions
        // thisprogram.docs = program.docs
        // thisprogram.experience = program.experience
        // thisprogram.sum = program.sum
        // thisprogram.purpose = program.purpose
        // thisprogram.calculation = program.calculation
        // await thisprogram.save();
        // return ''
    }

}

module.exports = new SocialityService()