module.exports = class UsersDto{
    tn
    full_name
    login
    id
    email
    inn
    moderator
    account
    checked
    avatar
    unit
    usedspace
    diskspace
    constructor(model) {
        this.login = model.login
        this.full_name = model.full_name
        this.id = model.id
        this.tn = model.tn
        this.email = model.email
        this.inn = model.inn
        this.moderator = model.moderator
        this.checked = model.checked
        this.avatar = model.avatar
        this.account = model.account
        this.unit = model.unit
        this.usedspace = model.usedspace
        this.diskspace = model.diskspace
    }
}