import User from '@dao/users'
import { encryption, jwt } from '@utils'

const authCheck = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.me
  })
}

const tryLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.getOneByEmail(email)

    const isValidUser = await encryption.comparePassword(password, user.password)

    if (isValidUser) {
      delete user.password

      const payload = { ...user }
      const token = jwt.createToken(payload)

      return res.status(200).json({
        user: payload,
        token
      })
    } else {
      return next(Error('userInfo is wrong'))
    }
  } catch (err) {
    return next(err)
  }
}

export {
  authCheck,
  tryLogin
}
