module.exports = class PayslipDto{
    tn
    type
    cost
    days
    uchet
    stazh
    held
    payments
    total
    constructor(model) {
        this.tn = model.tn
        this.cost = model.cost
        this.days = model.days
        this.uchet = model.uchet
        this.stazh = model.stazh
        this.held = model.held
        this.payments = model.payments
        this.total = model.total
    }
}