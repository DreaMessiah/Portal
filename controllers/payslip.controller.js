const PayslipService = require('../service/payslip.service')
const T13Service = require('../service/t13.service')
class PayslipController {
    async getDays(req,res,next) {
        try{
            const daysData = await PayslipService.getdays()
            return res.status(200).json(daysData)
        }catch (e){
            next(e)
        }
    }
    async getInfo(req,res,next) {
        try{
            const infoData = await PayslipService.getinfo()
            return res.status(200).json(infoData)
        }catch (e){
            next(e)
        }
    }
    async getKtu(req,res,next) {
        try{
            const ktuData = await PayslipService.getktu()
            return res.status(200).json(ktuData)
        }catch (e){
            next(e)
        }
    }
    async getData(req,res,next) {
        try{
            const {month,year} = req.body
            const info = await PayslipService.getinfo(req.user.tn,month,year)
            const DaysToPayslip = await PayslipService.getdays(req.user.tn,month,year)
            const T13 = await T13Service.getMonthForUser(req.user.tn,month,year)
            const ktu = await PayslipService.getktu(req.user.tn,month,year)
            const days = {}
            const uniqueValues = new Set(Object.values(DaysToPayslip));
            const count = uniqueValues.size;
            if(count){
                for (let i = 1;i <= 31;i++){
                    const key = 'd' + i
                    if(T13[key].length) days[i] = 2
                    else days[i] = +DaysToPayslip[key]
                }
            }
            return res.status(200).json({info,days,ktu})
        }catch (e) {
            next(e)
        }
    }
}
module.exports = new PayslipController()