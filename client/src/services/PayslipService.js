import $api from "../http"

export default class PayslipService{
    static async getPayslipData(tn,month,year){
        return $api.post('/payslip/data',{tn,month,year})
    }
}
