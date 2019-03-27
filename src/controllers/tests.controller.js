import Test from '../models/tests'

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

const get = async (req, res, next) => {
 
  try {
    const result = await Test.get()
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

export {
  add, get,
}
