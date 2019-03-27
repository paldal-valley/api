import User from '../models/users'

const add = async (req, res, next) => {
  const { body: options } = req

  try {
    const result = await User.add(options)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

export {
  add,
}
