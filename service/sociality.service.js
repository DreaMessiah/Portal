const {ProgramOfSoc, t13uni, User, Commission} = require('../models/models')
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


}

module.exports = new SocialityService()