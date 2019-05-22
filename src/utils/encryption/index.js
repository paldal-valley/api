import bcrypt from 'bcryptjs'

const saltRounds = Number(process.env.PASSWORD_SALT_ROUND)

const createPassword = plainPassword => {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plainPassword, salt)
}

const comparePassword = async (plainPassword, password) => {
  return await bcrypt.compareSync(plainPassword, password)
}

export default {
  createPassword,
  comparePassword
}
