const {Payslip,Ktulist,TableTabel} = require('../models/models')
const ApiError = require('../exceptions/api.error')
const TabelDto = require("../dtos/tabelDto");

class PayslipService {
    async getdays(tn,month,year) {
        const tabel = await TableTabel.findAll({where:{tn:tn,month:month,year:`${year}`}})
        if(!tabel.length) throw ApiError.BadRequest('База с табелями пуста')
        console.log(tabel)
        const days = []
        for (let i = 1; i <= 31; i++) {
            const dKey = 'd' + i;
            const hasNonZero = tabel.some(obj => obj['m' + i].length);
            days[dKey] = hasNonZero;
        }
        return days
    }
    async getinfo(tn,month,year) {
        const payslip = await Payslip.findAll({where:{tn:tn,month:month,year:`${year}`}})
        if(!payslip) throw ApiError.BadRequest('База с иформацией об оплате пуста')
        //const payslipDto = new PayslipDto(payslip)
        payslip.map((item,index) => {
            payslip[index].cost = item.cost.replace(/зеленые/g, `синие`)
            payslip[index].stazh = item.stazh.replace(/<br>/g, ``).replace(/-/g, ' ').replace(/\//g, '');
        })
        return payslip
    }
    async getktu(tn,month,year) {
        const ktu = await Ktulist.findAll({where:{tn:tn,month:month,year:`${year}`}})
        if(!ktu) return []
        return ktu
    }
    async getdata() {
        //const book = await Phonebook.findAll({order:[['order', 'ASC']]})
        //if(!book) throw ApiError.BadRequest('База с контактами пуста')
        //const phonesDto = new PhonesDto(book)
        //console.log(book)
        return
    }

}
module.exports = new PayslipService()