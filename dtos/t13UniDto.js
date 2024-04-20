module.exports = class T13UniDto{
    id
    tn
    name
    developer
    branch
    onboard
    term
    status
    gender
    constructor(model) {
        this.id = model.id
        this.tn = model.tn
        this.name = model.name
        this.developer = model.developer
        this.branch = model.branch
        this.onboard = model.onboard
        this.term = model.term
        this.status = model.status
        this.gender = model.gender
    }
}