const {Objects, HumanList} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
const {DataTypes} = require("sequelize");
class MansService {
    generateRandomFileName() {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 10000);
        return `PO-${timestamp}_${randomNumber}`;
    }

    async delManHumanList(man) {
        try{
            console.log(man)
            const rowToDelete = await HumanList.findByPk(man.idman);

            if (!rowToDelete) {
                // Если строка не найдена, выводим сообщение и выходим из функции
                console.log("Строка с указанным id не найдена");
                return;
            }

            // Удаляем строку из базы данных
            await rowToDelete.destroy();
            return true
        }catch{
            return false
        }
    }

    async getHumanList() {
        try{
            const list = await HumanList.findAll()
            return list
        }catch{
        }
    }

    async plusManHR(man) {
        try{
            const thistn = this.generateRandomFileName()
            const plusman = await HumanList.create({
                name:man.fio,
                developer:man.dev,
                branch:man.branch,
                onboard:'',
                term:'',
                document:man.doc,
                tn:thistn,
                groups:'',
                status:'',
                gender:'',
                rk:'',
                sn:'',
                oklad:'',
                method:'Вахтовый',
                month:'',
                year:'',
                inn:'',
                birthday:'',
                d1:'',
                d2:'',
                d3:'',
                d4:'',
                d5:'',
                d6:'',
                d7:'',
                d8:'',
                d9:'',
                d10:'',
                d11:'',
                d12:'',
                d13:'',
                d14:'',
                d15:'',
                d16:'',
                d17:'',
                d18:'',
                d19:'',
                d20:'',
                d21:'',
                d22:'',
                d23:'',
                d24:'',
                d25:'',
                d26:'',
                d27:'',
                d28:'',
                d29:'',
                d30:'',
                d31:''
            })

            return man.fio+' '+man.dev+' - добавлен в список'
        }catch{
            return 'НЕ получилось добавить '+man.fio+' '+man.dev
        }
    }
}

module.exports = new MansService()