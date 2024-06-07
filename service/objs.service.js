const {Objects, NumberObjects, Ymshifr, T13, TableTabel, KtuList, User, SrtoObjects} = require('../models/models')
const ObjsDto = require('../dtos/objsDto')
const ApiError = require('../exceptions/api.error')
const {DataTypes, Op, Sequelize} = require("sequelize");
class ObjsService{

    async thisObj(object_id){
        return await Objects.findAll({where: {id:+object_id.object_id}})
    }

    async getObjects(inn){
        return await Objects.findAll({where: {inn:inn}, order: [['shifr', 'ASC']]})
    }

    async getAllTabels(search){
        return await Ymshifr.findAll({where: {object_id:search.getId, inn:search.inn,[Op.or]: [{ trash: null },{ trash: false }]}, order: [['year', 'DESC']]})
    }

    async getTabelsForAll(search){
        return await Ymshifr.findAll({where: {year: search.year, inn:search.inn,[Op.or]: [{ trash: null },{ trash: false }]}, order: [['year', 'DESC']]})
    }

    async createTabels(tabel){
        const idobj = parseInt(tabel.getId)
        await Ymshifr.create({object_id:idobj, shifr:idobj, month:tabel.selMonth, year:tabel.selYear, inn:tabel.inn})
        return await Ymshifr.findAll({where: {object_id:tabel.getId, inn:tabel.inn}, order: [['year', 'DESC']]})

    }

    async showObjects(user){
        const newList = []
        const listObjs = await NumberObjects.findAll({where: {inn:user.inn, user_id:user.user_id}, order: [['id', 'DESC']]})
        const allObjs = await Objects.findAll({where: {inn:user.inn}, order: [['shifr', 'ASC']]})
        listObjs.forEach(obj=>{
            const newObj = {}
            allObjs.forEach(strock => {
                if(strock.id === obj.object_id){
                    newObj.id = strock.id
                    newObj.shifr = strock.shifr
                    newObj.nameobject = strock.nameobject
                    newObj.ogm_j = strock.ogm_j
                    newObj.prior = strock.prior
                    newObj.ras = strock.ras
                    newObj.dop1 = strock.dop1
                    newObj.dop2 = strock.dop2
                    newList.push(newObj)
                }
            })
        })
        return newList
    }
    async insertObjects(obj_id,login,iduser,inn){
        const haveObj = await NumberObjects.findOne({where: {object_id:obj_id}})
        if(haveObj){
            const papa = await User.findOne({where: {id:haveObj.papa}})
            return [haveObj, 'haven', papa.full_name]
        }else{
            await NumberObjects.create({object_id:obj_id,nameobject:'',user_id:iduser,papa:iduser,inn:inn,login:login})
            return await NumberObjects.findAll({where: {inn:inn,user_id:iduser}, order: [['id', 'DESC']]})
        }
    }

    async getT13(params){
        return await T13.findAll({where: {inn:params.inn, month:params.month, year:params.year}, order: [['name', 'ASC']]})
    }
    async listTabelMans(params){
        return await TableTabel.findAll({where: {inn:params.inn, object_id:params.shifre, month:params.month, year:params.year}, order: [['name', 'ASC']]})
    }
    async getKTUdate(params){
        return await KtuList.findAll({
            where: {
                ktudate: {
                    [Op.between]: [params.datestart, params.dateend] // Указываем диапазон дат
                }
            }
        })
    }
    async copyTab(params) {
        const months = [
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
            'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ]
        const listTabel = await TableTabel.findAll({
            where: {
                inn: params.inn,
                object_id: +params.shifre,
                month: params.month,
                year: params.year
            }, order: [['name', 'ASC']]
        })

        let myyear = +params.year
        let newmonth
        let newyear
        let intmonth
        let intyear
        const mymonth = months.indexOf(params.month)
        if(mymonth<11){
            newmonth = months[mymonth+1]
            myyear = myyear
            newyear = ''+myyear
            intmonth = mymonth+1
            intyear = myyear
        } else {
            newmonth = 'январь'
            myyear = myyear + 1
            newyear = ''+myyear
            intmonth = 0
            intyear = myyear
        }
        const tabel = await Ymshifr.findOne({where: {object_id:params.shifre, inn:params.inn, month:''+intmonth, year:''+intyear }, order: [['year', 'DESC']]})
        if(tabel){
            return false
        } else {
            await Ymshifr.create({object_id:params.shifre, shifr:params.shifrname, month:''+intmonth, year:''+intyear, inn:params.inn})
        }
        const newRecords = listTabel.map(record => ({
            name:record.name,
            developer:record.developer,
            branch:record.branch,
            object_id:record.object_id,
            shifr:record.shifr,
            month: newmonth, // Здесь замените newMonth на новое значение месяца
            year: newyear, // Здесь замените newMonth на новое значение месяца
            ktu:'1',
            marker:0,
            ras:record.ras,
            company_id:record.company_id,
            inn:record.inn,
            transport:record.transport,
            price:record.price,
            tn:record.tn,
            m1:'',
            m2:'',
            m3:'',
            m4:'',
            m5:'',
            m6:'',
            m7:'',
            m8:'',
            m9:'',
            m10:'',
            m11:'',
            m12:'',
            m13:'',
            m14:'',
            m15:'',
            m16:'',
            m17:'',
            m18:'',
            m19:'',
            m20:'',
            m21:'',
            m22:'',
            m23:'',
            m24:'',
            m25:'',
            m26:'',
            m27:'',
            m28:'',
            m29:'',
            m30:'',
            m31:'',
            c1:'',
            c2:'',
            c3:'',
            c4:'',
            c5:'',
            c6:'',
            c7:'',
            c8:'',
            c9:'',
            c10:'',
            c11:'',
            c12:'',
            c13:'',
            c14:'',
            c15:'',
            c16:'',
            c17:'',
            c18:'',
            c19:'',
            c20:'',
            c21:'',
            c22:'',
            c23:'',
            c24:'',
            c25:'',
            c26:'',
            c27:'',
            c28:'',
            c29:'',
            c30:'',
            c31:'',
            dop1:'',
            dop2:'',
            dop3:'',
            dop4:'',
            dop5:'',
            dop6:'',
            dop7:'',
            dop8:'',
            dop9:'',
            dop10:'',
            dop11:'',
            dop12:'',
            dop13:'',
            dop14:'',
            dop15:'',
            dop16:'',
            dop17:'',
            dop18:'',
            dop19:'',
            dop20:'',
            dop21:'',
            dop22:'',
            dop23:'',
            dop24:'',
            dop25:'',
            dop26:'',
            dop27:'',
            dop28:'',
            dop29:'',
            dop30:'',
            dop31:''
            // d1: record.d1,
            // d2: record.d2,
            // // Продолжайте также для всех дней и других полей
            // ktu: record.ktu // Пример оставления ktu без изменений
        }));
        // Создать новые записи в базе данных с измененными параметрами
        await TableTabel.bulkCreate(newRecords);
        return true
    }


    async delManTabel(params){
        const idman = params.man
        try{
            const rowToDelete = await TableTabel.findByPk(idman)
            if(!rowToDelete){
                return 'Строка уже удалена ранее'
            }
            await rowToDelete.destroy()
            return 'Запись удалина'
        }catch(error){
            return 'Что-то пошло не так'
        }
    }
    async getUsersList(){
        try{
            return await User.findAll({
                attributes: { exclude: ['password', 'avatar', 'inn', 'admin', 'moderator', 'editcom', 'passport', 'phone', 'phonecompany', 'snils', 'unit'] }
            })
        }catch(e){
            console.log(e)
        }
    }
    async passObj(params){
        try{
            return await NumberObjects.create({object_id:params.object_id,nameobject:'',user_id:params.user_id,papa:params.papa,inn:'8617014209',login:params.login})
        }catch(e){
            console.log(e)
        }
    }
    async dataOfObj(params){
        try{
            return await NumberObjects.findAll({where: {object_id: params.idobj}})
        }catch(e){
            console.log(e)
        }
    }

    async getPriory(){
        return await SrtoObjects.findAll({include: ['objects' ]})
    }

    async getTabelSRTO(objs){
        try{
            const result = await TableTabel.findAll({
                where: {
                    shifr: {
                        [Op.in]: objs.nameobj
                    },
                    month: objs.selmonth.label,
                    year: `${objs.selyear}`
                },
                order: [['name', 'ASC']]
            });
            result.forEach(line => {
                if(line.name === 'Вороненко Александр Васильевич'){console.log(line)}
            })
            return result
        }catch(e){
            console.log(e)
        }
    }
}
module.exports = new ObjsService()