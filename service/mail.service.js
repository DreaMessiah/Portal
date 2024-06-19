const nodemailer = require('nodemailer')
const config = require('config')
const {Messages, User} = require("../models/models");
const HistoryService = require("./history.service");

class MailService{
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:config.get('smtp_host'),
            port:config.get('smtp_port'),
            secure: config.get('smpt_secure'),
            auth:{
                user:config.get('smtp_user'),
                pass:config.get('smtp_password')
            }
        })
    }
    async sendActivationMail(to,link){
        await this.transporter.sendMail({
            from: config.get('smtp_user'),
            to,
            subject:'Test message from our Portal',
            text:'',
            html:
                `
                    <div>
                        <h1>Training your brain. Turn up the volume</h1>
                        <p>${link}</p>
                        <a href="https://bestcountry.space/">Follow this link.</a>
                        
                    </div>
                `
        })
    }
    async sendQuestionToManager(to,title,text,user,tn){
        console.log(to,title,text,user,tn)
        const searchTabNum = await User.findOne({where: {tn: tn}})
        const thistn = searchTabNum.dataValues.tn
        await Messages.create({tn_to: thistn, tn_from: user.tn, title: '', text: title+' / '+text, files: null, trash_to: false,trash_from: false,read: false})
        await HistoryService.createAction(user.id,10,`Обращение в поддержку ${title}`)
        await this.transporter.sendMail({
            from: config.get('smtp_user'),
            to,
            subject:title,
            text:'',
            html:
                `
                    <div>
                        <h1>Вам поступил вопрос от пользователя Корпоративного портала</h1>
                        <h3>Пользователь ${user.full_name}</h3>
                        <p>{text}</p>                        
                    </div>
                `
        })

    }
}
module.exports = new MailService()