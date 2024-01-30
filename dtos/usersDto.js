module.exports = class UsersDto{
    tn;
    full_name;
    login;
    id;
    email;
    inn;
    constructor(model) {
        this.login = model.login
        this.full_name = model.full_name
        this.id = model.id
        this.tn = model.tn
        this.email = model.email
        this.inn = model.inn
    }
}