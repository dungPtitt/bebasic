require('dotenv').config()
const nodemailer = require("nodemailer");

let sendSempleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"shop demo 👻" <dung136ptit@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Đơn hàng của bạn đã được giao thành công!", // Subject line
    html: `
      <h4>ShopDemo đã giao cho bạn đầy đủ với các sản phẩm được liên kết bên dưới theo đơn hàng của bạn, ShopDemo hi vọng bạn hài lòng với các sản phẩm này!
      </h4>
      <h4>Một vài lưu ý nhỏ cho bạn:</h4>
      <ul>
        <li>Hãy kiểm tra kỹ chất lượng sản phẩm bạn nhận được và giữ lại đơn hơn, hộp sản phẩm và phiếu báo hành(nếu có) để trả hàng hoặc báo hành khi cần thiết.</li>
        <li>Trong trường hợp sản phẩm có dấu hiệu hư hỏng/bể vỡ hoặc không đúng với thông tin như mô tả, bạn hãy liên hệ với ShopDemo bằng cách để lại tin nhắn lai trang trong vòng 24 giờ sau khi nhận sản phẩm để được hỗ trợ nhé</li>
      </ul>
      <div>Cảm ơn bạn rất nhiều vì đã mua hàng ở shop!</div>
    `, // html body
  });

}

let sendForgotPassword = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"shop demo 👻" <dung136ptit@gmail.com>', // sender address
    to: dataSend.emailAcc, // list of receivers
    subject: "Lấy lại mật khẩu thành công!", // Subject line
    html: `
      <h4>Một vài lưu ý nhỏ cho bạn:</h4>
      <div>Mật khẩu mới của bạn là: ${dataSend.password}</div>
      <div>Vui lòng đổi lại mật khẩu sau khi đăng nhập.</div>
    `, // html body
  });

}


{/* <h3>Xin chao ${dataSend.name}</h3> */}
{/* <a href = ${dataSend.link} target="_blank">Click here</a> */}
module.exports = {
  sendSempleEmail,
  sendForgotPassword,
}