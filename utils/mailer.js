import {createTransport} from 'nodemailer'

const transporter = createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'builtrackrverify@gmail.com',
            pass: 'bptxkrqhxryaaabc'
        }
    }
)

export {transporter}