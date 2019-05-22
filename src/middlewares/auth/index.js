import User from '@dao/users'

const isLoggedIn = (req, res, next) => {
  if (typeof req.me === 'undefined') {
    next(Error('User not logged in'))
  } else {
    next()
  }
}

const emailDupCheck = async (req, res, next) => {
  try {
    const { email } = req.body
    await User.emailDupCheck(email)
    next()
  } catch (err) {
    next(err)
  }
}

export {
  isLoggedIn,
  emailDupCheck
}
