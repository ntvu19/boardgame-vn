const nodemailer = require('nodemailer')

const user = process.env.USER
const pass = process.env.PASS

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass
    }
})

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    // <a href="http://localhost:${process.env.PORT}/user/active/${confirmationCode}?_method=PUT">Nhấn vào đây</a>
    transport.sendMail({
        from: user,
        to: email,
        subject: 'Xác thực tài khoản BoardgameVN',
        html: `<div>
        <h1>Xác thực email</h1>
                <h2>Xin chào ${name},</h2>
                <p>Cảm ơn bạn đã sử dụng BoardgameVN, để tiếp tục thực hiện các chức năng khác
                vui lòng xác thực tài khoản bằng cách nhấn vào đường dẫn sau</p>
                <a href="http://board-game-vn.herokuapp.com/user/active/${confirmationCode}?_method=PUT">Nhấn vào đây</a>
                </div>`
    }).catch(err => console.log(err))
}