const nodemailer = require('nodemailer')
const config = require('config')
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
}
module.exports = new MailService()