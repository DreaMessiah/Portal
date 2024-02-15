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
    }
}