module.exports = class PhonesDto{
    name
    mobile_phone
    city_phone
    ats
    email
    position
    job
    order
    heading
    constructor(model) {
        this.name = model.name
        this.mobile_phone = model.mobile_phone
        this.city_phone = model.city_phone
        this.ats = model.ats
        this.email = model.email
        this.position = model.position
        this.job = model.job
        this.order = model.order
        this.heading = model.heading
    }
}