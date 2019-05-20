import User from '../models/users'

const add = async (req, res, next) => {
  const { body: options } = req

  try {
    const result = await Test.add(options)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

const send_confirm_email = async (req, res, next) => {
  const { body: options } = req

  try {
    await User.email_dup_check(options)
    console.log(options)
    send_email(options.email, options.token);
    return res.status(200).json({
      msg: "success"
    })
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

async function send_email(receiver, token) {
// Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: 'paldalvalley@gmail.com',
        pass: 'ajou1234!'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ajou Coin 👻"<ajoucoin@ajoucoin.com>', // sender address
    to: receiver,
    subject: "아주 코인 인증 메일", // Subject line
    text: "인증코드는 "+ token + " 입니다.", // plain text body
    html: "<b>"+"인증코드는 "+ token + " 입니다."+"</b>" // html body
  });
}

export {
  add, send_confirm_email
}
