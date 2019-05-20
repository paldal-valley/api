import Major from '../models/majors'

const get = async (req, res, next) => {
 
  try {
    const result = await Major.get()
    console.log(JSON.stringify(result))
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({
      msg: err
    })
  }
}

export {
  get,
}
