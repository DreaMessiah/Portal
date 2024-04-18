module.exports = class T13Dto{
    id
    tn
    name
    developer
    branch
    groups
    onboard
    term
    status
    document
    gender
    rk
    sn
    oklad
    method
    month
    year
    inn
    birthday
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.developer = model.developer
        this.tn = model.tn
        this.groups = model.groups
        this.branch = model.branch
        this.onboard = model.onboard
        this.term = model.term
        this.status = model.status
        this.document = model.document
        this.gender = model.gender
        this.rk = model.rk
        this.sn = model.sn
        this.oklad = model.oklad
        this.method = model.method
        this.month = model.month
        this.year = model.year
        this.inn = model.inn
        this.birthday = model.birthday
    }
}