const {Payslip,KtuList,TableTabel} = require('../models/models')
const ApiError = require('../exceptions/api.error')
const TabelDto = require("../dtos/tabelDto");
const { Op } = require('sequelize')
class PayslipService {
    async getdays(tn,month,year) {
        const tabel = await TableTabel.findAll({where:{tn:tn,month:month,year:`${year}`}})
        if(!tabel.length) return []
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
        if(!payslip) return []
        //const payslipDto = new PayslipDto(payslip)
        payslip.map((item,index) => {
            payslip[index].cost = item.cost.replace(/зеленые/g, `синие`)
            payslip[index].stazh = item.stazh.replace(/<br>/g, ``).replace(/-/g, ' ').replace(/\//g, '');
        })
        return payslip
    }
    async getktu(tn,month,year) {
        const startDate = new Date(year, this.getMonthNumber(month), 1);
        const endDate = new Date(year, month + 1, 0);
        const ktu = await KtuList.findAll({where:{user_tn:tn}, date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }})
        if(!ktu) return []
        return ktu
    }

    getMonthName(monthNumber) {
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];

        // Проверяем, что номер месяца в допустимом диапазоне
        if (monthNumber >= 0 && monthNumber <= 11) {
            return months[monthNumber];
        } else {
            return 'Некорректный номер месяца';
        }
    }
    getMonthNumber(monthName) {
        const months = {
            'январь': 0,
            'февраль': 1,
            'март': 2,
            'апрель': 3,
            'май': 4,
            'июнь': 5,
            'июль': 6,
            'август': 7,
            'сентябрь': 8,
            'октябрь': 9,
            'ноябрь': 10,
            'декабрь': 11
        };

        // Приводим переданное название месяца к нижнему регистру для удобства сопоставления
        const normalizedMonthName = monthName.toLowerCase();

        // Проверяем, что переданное название месяца существует в объекте months
        if (normalizedMonthName in months) {
            return months[normalizedMonthName];
        } else {
            return 'Некорректное название месяца';
        }
    }
}
module.exports = new PayslipService()