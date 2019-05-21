import User from '../models/users'

const login = async (req, res, next) => {
  const { body: options } = req
  console.log(options);
  console.log(req.body);
  try {
    const result = await User.login(options)
    console.log(result)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

const check = async (req, res, next) => {

    try {
      return res.status(200).json({msg: "chiheon"})
    } catch (err) {
      return res.status(500).json({
        msg: err
      })
    }
  }

export {
  login, check
}
