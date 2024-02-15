import $api from "../http"

export default class AuthService{
    static async getPayslipData(tn,month,year){
        return $api.post('/payslip/data',{tn,month,year})
    }
}
