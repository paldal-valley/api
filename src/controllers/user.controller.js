import User from '../models/users'
import { getContract, walletAddress } from '../utils'
import { encryption, timestamp } from '@utils'

/*
  비즈니스로직은 DAO(model)가 아닌 controller에서
  DAO는 데이터에 접근해서 controller로 올바른 데이터를 전달해주는 역할만 할 것
 */

const add = async (req, res, next) => {
  const { body: options } = req
  console.log(options);
  try {
    const result = await User.add(options)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

const addUser = async (req, res, next) => {
  try {
    const doajouContract = await getContract()
    const { body: userInfo } = req
    if (!userInfo.email) return next(Error('email is required'))
    if (!userInfo.password) return next(Error('password is required'))
    if (!userInfo.name) return next(Error('name is required'))
    if (!userInfo.walletAddress) return next(Error('walletAddress is required'))

    userInfo.password = encryption.createPassword(userInfo.password)

    const payload = { ...userInfo }
    const result = await User.addOne(payload)
    const { walletAddress: userWallet } = await User.getOne(result.insertId)

    await doajouContract.methods.offerWelcomeToken(userWallet).send({
      from: walletAddress.owner
    })
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const resetUserPassword = async (req, res, next) => {
  try {
    const { body: userInfo } = req
    const { token } = req.params

    userInfo.password = encryption.createPassword(userInfo.password)
    let resetPasswordExpires = timestamp.changeTimestampFormat(userInfo.resetPasswordExpires)
    userInfo.resetPasswordExpires = null

    const result = await User.updateOnebyToken(token, resetPasswordExpires, userInfo)

    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const updateUser = async (req, res, next) => {
  try{
    const { body: userInfo } = req
    const { userId } = req.params

    const user = await User.getOneByEmail(userInfo.email)
    const isValidUser = await encryption.comparePassword(userInfo.current_password, user.password)
    delete userInfo.current_password

    if(isValidUser){
      userInfo.password? userInfo.password = encryption.createPassword(userInfo.password) : delete userInfo.password

      const payload = { ...userInfo }
      const result = await User.updateOne(userId, payload)
      return res.status(200).json(result)
    } else {
      return next(Error('userInfo is wrong'))
    }
  } catch (err) {
    return next(err)
  }
}

export {
  add,
  addUser,
  resetUserPassword,
  updateUser
}
