module.exports = class ObjsDto{
    id;
    shifr;
    nameobject;
    inn;
    ras;
    ogm_j;
    dop1;
    dop2;
    prior;

    constructor(model) {
        this.id = model.id
        this.shifr = model.shifr
        this.nameobject = model.nameobject
        this.inn = model.inn
        this.ras = model.ras
        this.ogm_j = model.ogm_j
        this.dop1 = model.dop1
        this.dop2 = model.dop2
        this.prior = model.prior
    }
}