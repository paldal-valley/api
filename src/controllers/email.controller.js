import User from '../models/users'
import { timestamp } from '@utils'

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
  
  let info = {
    from: '"Ajou Coin 👻"<ajoucoin@ajoucoin.com>', // sender address
    to: options.email,
    subject: "DoAjou 이메일 인증 메일",
    text:  '인증코드는 ' + options.token + '입니다.',
    html: "<b>"+"인증코드는 "+ options.token + " 입니다."+"</b>" // html body
  };

  try {
    await User.email_dup_check(options)
    send_email(info);
    return res.status(200).json({
      msg: "success"
    })
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

const send_password_reset_email = async (req, res, next) => {
  let { body: userInfo } = req
  const { email } = req.params

  let info = {
    from: '"Ajou Coin 👻"<ajoucoin@ajoucoin.com>', // sender address
    to: email,
    subject: "DoAjou 비밀번호 변경 메일",
    text:  "https://" + process.env.ROOT_PATH + "/auth/password/reset/" + userInfo.resetPasswordToken + "\n\n",
    html: "<b>"+"https://" + process.env.ROOT_PATH + "/auth/password/reset/" + userInfo.resetPasswordToken + "\n\n"+"</b>" // html body
  };

  try {
    await User.emailCheck(email)
    const user = await User.getOneByEmail(email)
    userInfo.resetPasswordExpires = timestamp.changeTimestampFormat(userInfo.resetPasswordExpires)
    const result = await User.updateOne(user.id, userInfo)
    send_email(info);
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

async function send_email(info) {

  const nodemailer = require("nodemailer");
  
  let transporter = await nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: process.env.DOAJOU_EMAIL,
        pass: process.env.DOAJOU_PW
    }
  });

  await transporter.sendMail(info);
}

export {
  add, send_confirm_email, send_password_reset_email
}
