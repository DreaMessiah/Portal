const sequelize = require('../db')
const {Sequelize, DataTypes} = require('sequelize')

const User = sequelize.define('users',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    tn:{type:DataTypes.STRING,unique:true},
    full_name:{type:DataTypes.TEXT},
    login:{type:DataTypes.STRING,unique:true},
    email:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    avatar:{type:DataTypes.TEXT},
    account:{type:DataTypes.TEXT},
    inn:{type:DataTypes.STRING},
    admin:{type:DataTypes.STRING},
    moderator:{type:DataTypes.BOOLEAN,defaultValue: false},
    editcom:{type:DataTypes.STRING},
    reg:{type:DataTypes.BOOLEAN,defaultValue: false},
    checked:{type:DataTypes.BOOLEAN,defaultValue: false},
    passport:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    phonecompany:{type:DataTypes.STRING},
    snils:{type:DataTypes.STRING},
    unit:{type:DataTypes.INTEGER}
})
const Token = sequelize.define('token',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    user_id:{type:DataTypes.INTEGER,ref:'users'},
    device_token:{type:DataTypes.TEXT},
    refresh_token:{type:DataTypes.TEXT,require:true}
})
const Files = sequelize.define('files',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING},
    type:{type:DataTypes.STRING},
    size:{type:DataTypes.STRING},
    access_link:{type:DataTypes.TEXT},
    user_id:{type:DataTypes.INTEGER,ref:'users'},
    object_id:{type:DataTypes.INTEGER,ref:'objects'},
    parent_id:{type:DataTypes.INTEGER}
})
const T13 = sequelize.define('t13', {
    id:{type:DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    name:{type:DataTypes.TEXT},
    developer:{type:DataTypes.TEXT},
    branch:{type:DataTypes.TEXT},
    employment:{type:DataTypes.TEXT},
    document:{type:DataTypes.TEXT},
    dismissal:{type:DataTypes.TEXT},
    tn:{type:DataTypes.TEXT},
    snils:{type:DataTypes.TEXT},
    passport:{type:DataTypes.TEXT},
    rk:{type:DataTypes.TEXT},
    groups:{type:DataTypes.TEXT},
    sn:{type:DataTypes.INTEGER},
    status:{type:DataTypes.TEXT},
    gender:{type:DataTypes.TEXT},
    salary:{type:DataTypes.FLOAT},
    method:{type:DataTypes.TEXT},
    month:{type:DataTypes.STRING},
    years:{type:DataTypes.INTEGER},
    inn:{type:DataTypes.STRING},
    d1:{type:DataTypes.STRING},
    d2:{type:DataTypes.STRING},
    d3:{type:DataTypes.STRING},
    d4:{type:DataTypes.STRING},
    d5:{type:DataTypes.STRING},
    d6:{type:DataTypes.STRING},
    d7:{type:DataTypes.STRING},
    d8:{type:DataTypes.STRING},
    d9:{type:DataTypes.STRING},
    d10:{type:DataTypes.STRING},
    d11:{type:DataTypes.STRING},
    d12:{type:DataTypes.STRING},
    d13:{type:DataTypes.STRING},
    d14:{type:DataTypes.STRING},
    d15:{type:DataTypes.STRING},
    d16:{type:DataTypes.STRING},
    d17:{type:DataTypes.STRING},
    d18:{type:DataTypes.STRING},
    d19:{type:DataTypes.STRING},
    d20:{type:DataTypes.STRING},
    d21:{type:DataTypes.STRING},
    d22:{type:DataTypes.STRING},
    d23:{type:DataTypes.STRING},
    d24:{type:DataTypes.STRING},
    d25:{type:DataTypes.STRING},
    d26:{type:DataTypes.STRING},
    d27:{type:DataTypes.STRING},
    d28:{type:DataTypes.STRING},
    d29:{type:DataTypes.STRING},
    d30:{type:DataTypes.STRING},
    d31:{type:DataTypes.STRING}
})
const Company = sequelize.define('company',{
    id:{type:DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    inn:{type:DataTypes.STRING},
    namecom:{type:DataTypes.STRING},
    namecut:{type:DataTypes.STRING},
    contact:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    ogrn:{type:DataTypes.STRING},
    status:{type:DataTypes.BOOLEAN},
    director:{type:DataTypes.STRING},
    tabel:{type:DataTypes.BOOLEAN},
    zp:{type:DataTypes.BOOLEAN},
    crm:{type:DataTypes.BOOLEAN},
    vak:{type:DataTypes.BOOLEAN},
    sale:{type:DataTypes.BOOLEAN},
    uraddress:{type:DataTypes.STRING},
    phonecom:{type:DataTypes.STRING},
    phonepri:{type:DataTypes.STRING},
    phonehr:{type:DataTypes.STRING},
    phonemon:{type:DataTypes.STRING},
    fax:{type:DataTypes.STRING},
    factaddress:{type:DataTypes.STRING},
    rs:{type:DataTypes.STRING},
    namebank:{type:DataTypes.STRING},
    kors:{type:DataTypes.STRING},
    bik:{type:DataTypes.STRING},
    emailcom:{type:DataTypes.STRING},
    srto_month:{type:DataTypes.STRING},
    srto_year:{type:DataTypes.STRING},
    srto_branch:{type:DataTypes.STRING},
    vem:{type:DataTypes.INTEGER},
    periodvem:{type:DataTypes.STRING},
    daysvem:{type:DataTypes.STRING},
    document:{type:DataTypes.STRING},
    oclockday:{type:DataTypes.STRING},
    information:{type:DataTypes.STRING}
})
const YmSvarka = sequelize.define('ym_svarka',{
    id:{type:DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    indicator:{type:DataTypes.STRING},
    shifr:{type:DataTypes.STRING},
    year:{type:DataTypes.STRING},
    month:{type:DataTypes.STRING},
    inn:{type:DataTypes.STRING}
})
const TabelSv = sequelize.define('tabel_sv',{
    id:{type:DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    shifr:{type:DataTypes.STRING},
    year:{type:DataTypes.STRING},
    month:{type:DataTypes.STRING},
    crew:{type:DataTypes.STRING},
    checkin:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    developer:{type:DataTypes.STRING},
    tn:{type:DataTypes.STRING},
    inn:{type:DataTypes.STRING},
    volume:{type:DataTypes.STRING},
    unit:{type:DataTypes.STRING},
    norma:{type:DataTypes.STRING},
    writed:{type:DataTypes.STRING},
    d1:{type:DataTypes.INTEGER},
    d2:{type:DataTypes.INTEGER},
    d3:{type:DataTypes.INTEGER},
    d4:{type:DataTypes.INTEGER},
    d5:{type:DataTypes.INTEGER},
    d6:{type:DataTypes.INTEGER},
    d7:{type:DataTypes.INTEGER},
    d8:{type:DataTypes.INTEGER},
    d9:{type:DataTypes.INTEGER},
    d10:{type:DataTypes.INTEGER},
    d11:{type:DataTypes.INTEGER},
    d12:{type:DataTypes.INTEGER},
    d13:{type:DataTypes.INTEGER},
    d14:{type:DataTypes.INTEGER},
    d15:{type:DataTypes.INTEGER},
    d16:{type:DataTypes.INTEGER},
    d17:{type:DataTypes.INTEGER},
    d18:{type:DataTypes.INTEGER},
    d19:{type:DataTypes.INTEGER},
    d20:{type:DataTypes.INTEGER},
    d21:{type:DataTypes.INTEGER},
    d22:{type:DataTypes.INTEGER},
    d23:{type:DataTypes.INTEGER},
    d24:{type:DataTypes.INTEGER},
    d25:{type:DataTypes.INTEGER},
    d26:{type:DataTypes.INTEGER},
    d27:{type:DataTypes.INTEGER},
    d28:{type:DataTypes.INTEGER},
    d29:{type:DataTypes.INTEGER},
    d30:{type:DataTypes.INTEGER},
    d31:{type:DataTypes.INTEGER},
    p1:{type:DataTypes.INTEGER},
    p2:{type:DataTypes.INTEGER},
    p3:{type:DataTypes.INTEGER},
    p4:{type:DataTypes.INTEGER},
    p5:{type:DataTypes.INTEGER},
    p6:{type:DataTypes.INTEGER},
    p7:{type:DataTypes.INTEGER},
    p8:{type:DataTypes.INTEGER},
    p9:{type:DataTypes.INTEGER},
    p10:{type:DataTypes.INTEGER},
    p11:{type:DataTypes.INTEGER},
    p12:{type:DataTypes.INTEGER},
    p13:{type:DataTypes.INTEGER},
    p14:{type:DataTypes.INTEGER},
    p15:{type:DataTypes.INTEGER},
    p16:{type:DataTypes.INTEGER},
    p17:{type:DataTypes.INTEGER},
    p18:{type:DataTypes.INTEGER},
    p19:{type:DataTypes.INTEGER},
    p20:{type:DataTypes.INTEGER},
    p21:{type:DataTypes.INTEGER},
    p22:{type:DataTypes.INTEGER},
    p23:{type:DataTypes.INTEGER},
    p24:{type:DataTypes.INTEGER},
    p25:{type:DataTypes.INTEGER},
    p26:{type:DataTypes.INTEGER},
    p27:{type:DataTypes.INTEGER},
    p28:{type:DataTypes.INTEGER},
    p29:{type:DataTypes.INTEGER},
    p30:{type:DataTypes.INTEGER},
    p31:{type:DataTypes.INTEGER}
})
const TableTabel = sequelize.define('table-tabel',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    full_name:{type:DataTypes.STRING},
    developer:{type:DataTypes.STRING},
    branch:{type:DataTypes.STRING},
    shifr:{type:DataTypes.STRING},
    months:{type:DataTypes.STRING},
    data:{type:DataTypes.STRING},
    ktu:{type:DataTypes.STRING},
    marker:{type:DataTypes.INTEGER},
    ras:{type:DataTypes.STRING},
    inn:{type:DataTypes.STRING},
    transport:{type:DataTypes.STRING},
    price:{type:DataTypes.STRING},
    tn:{type:DataTypes.STRING},
    m1:{type:DataTypes.STRING},
    m2:{type:DataTypes.STRING},
    m3:{type:DataTypes.STRING},
    m4:{type:DataTypes.STRING},
    m5:{type:DataTypes.STRING},
    m6:{type:DataTypes.STRING},
    m7:{type:DataTypes.STRING},
    m8:{type:DataTypes.STRING},
    m9:{type:DataTypes.STRING},
    m10:{type:DataTypes.STRING},
    m11:{type:DataTypes.STRING},
    m12:{type:DataTypes.STRING},
    m13:{type:DataTypes.STRING},
    m14:{type:DataTypes.STRING},
    m15:{type:DataTypes.STRING},
    m16:{type:DataTypes.STRING},
    m17:{type:DataTypes.STRING},
    m18:{type:DataTypes.STRING},
    m19:{type:DataTypes.STRING},
    m20:{type:DataTypes.STRING},
    m21:{type:DataTypes.STRING},
    m22:{type:DataTypes.STRING},
    m23:{type:DataTypes.STRING},
    m24:{type:DataTypes.STRING},
    m25:{type:DataTypes.STRING},
    m26:{type:DataTypes.STRING},
    m27:{type:DataTypes.STRING},
    m28:{type:DataTypes.STRING},
    m29:{type:DataTypes.STRING},
    m30:{type:DataTypes.STRING},
    m31:{type:DataTypes.STRING},
    c1:{type:DataTypes.STRING},
    c2:{type:DataTypes.STRING},
    c3:{type:DataTypes.STRING},
    c4:{type:DataTypes.STRING},
    c5:{type:DataTypes.STRING},
    c6:{type:DataTypes.STRING},
    c7:{type:DataTypes.STRING},
    c8:{type:DataTypes.STRING},
    c9:{type:DataTypes.STRING},
    c10:{type:DataTypes.STRING},
    c11:{type:DataTypes.STRING},
    c12:{type:DataTypes.STRING},
    c13:{type:DataTypes.STRING},
    c14:{type:DataTypes.STRING},
    c15:{type:DataTypes.STRING},
    c16:{type:DataTypes.STRING},
    c17:{type:DataTypes.STRING},
    c18:{type:DataTypes.STRING},
    c19:{type:DataTypes.STRING},
    c20:{type:DataTypes.STRING},
    c21:{type:DataTypes.STRING},
    c22:{type:DataTypes.STRING},
    c23:{type:DataTypes.STRING},
    c24:{type:DataTypes.STRING},
    c25:{type:DataTypes.STRING},
    c26:{type:DataTypes.STRING},
    c27:{type:DataTypes.STRING},
    c28:{type:DataTypes.STRING},
    c29:{type:DataTypes.STRING},
    c30:{type:DataTypes.STRING},
    c31:{type:DataTypes.STRING},
    dop1:{type:DataTypes.STRING},
    dop2:{type:DataTypes.STRING},
    dop3:{type:DataTypes.STRING},
    dop4:{type:DataTypes.STRING},
    dop5:{type:DataTypes.STRING},
    dop6:{type:DataTypes.STRING},
    dop7:{type:DataTypes.STRING},
    dop8:{type:DataTypes.STRING},
    dop9:{type:DataTypes.STRING},
    dop10:{type:DataTypes.STRING},
    dop11:{type:DataTypes.STRING},
    dop12:{type:DataTypes.STRING},
    dop13:{type:DataTypes.STRING},
    dop14:{type:DataTypes.STRING},
    dop15:{type:DataTypes.STRING},
    dop16:{type:DataTypes.STRING},
    dop17:{type:DataTypes.STRING},
    dop18:{type:DataTypes.STRING},
    dop19:{type:DataTypes.STRING},
    dop20:{type:DataTypes.STRING},
    dop21:{type:DataTypes.STRING},
    dop22:{type:DataTypes.STRING},
    dop23:{type:DataTypes.STRING},
    dop24:{type:DataTypes.STRING},
    dop25:{type:DataTypes.STRING},
    dop26:{type:DataTypes.STRING},
    dop27:{type:DataTypes.STRING},
    dop28:{type:DataTypes.STRING},
    dop29:{type:DataTypes.STRING},
    dop30:{type:DataTypes.STRING},
    dop31:{type:DataTypes.STRING}
})
const TableZayavka = sequelize.define('table-zayavka',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    year:{type:DataTypes.STRING},
    month:{type:DataTypes.STRING},
    shifr:{type:DataTypes.STRING},
    num:{type:DataTypes.STRING},
    codecrew:{type:DataTypes.STRING},
    dateburn:{type:DataTypes.STRING},
    way:{type:DataTypes.INTEGER},
    dostup:{type:DataTypes.STRING},
    size:{type:DataTypes.STRING},
    numberzayavka:{type:DataTypes.STRING},
    inn:{type:DataTypes.STRING},
    zav:{type:DataTypes.STRING},
    stat:{type:DataTypes.STRING}
})
const Days = sequelize.define('days',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    month:{type:DataTypes.STRING},
    name:{type:DataTypes.TEXT},
    number:{type:DataTypes.STRING},
    cost:{type:DataTypes.STRING},
    days:{type:DataTypes.STRING},
    uchet:{type:DataTypes.INTEGER},
    stazh:{type:DataTypes.STRING},
    inn:{type:DataTypes.STRING},
    snils:{type:DataTypes.STRING},
    held:{type:DataTypes.STRING},
    payments:{type:DataTypes.STRING},
    total:{type:DataTypes.STRING},
    tn:{type:DataTypes.STRING}
})
const Objects = sequelize.define('objects',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    shifr:{type:DataTypes.TEXT},
    nameobject:{type:DataTypes.TEXT},
    inn:{type:DataTypes.STRING},
    ras:{type:DataTypes.INTEGER},
    ogm_j:{type:DataTypes.INTEGER},
    dop1:{type:DataTypes.INTEGER},
    dop2:{type:DataTypes.INTEGER},
    prior:{type:DataTypes.INTEGER}
})

const NumberObjects = sequelize.define('number_objects',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    shifr:{type:DataTypes.STRING},
    nameobject:{type:DataTypes.STRING},
    user_id:{type:DataTypes.INTEGER,ref:'users'},
    papa:{type:DataTypes.STRING},
    burn:{type:DataTypes.DATE,defaultValue: Sequelize.fn('NOW')},
    inn:{type:DataTypes.STRING},
    login:{type:DataTypes.STRING}
})

const ObjectsSV = sequelize.define('obj_sv',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    shifr:{type:DataTypes.STRING},
    nameobject:{type:DataTypes.STRING},
    user:{type:DataTypes.STRING},
    papa:{type:DataTypes.STRING},
    burn:{type:DataTypes.DATE,defaultValue: Sequelize.fn('NOW')},
    inn:{type:DataTypes.STRING},
    login:{type:DataTypes.STRING}
})

module.exports = {
    User,Token,T13,Company,TableZayavka,TableTabel,TabelSv,YmSvarka,Days,NumberObjects,Objects,ObjectsSV,Files
}

