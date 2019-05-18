import Test from '../models/posts/index'
import TestQ from '../models/posts/posts_questions'

const add = async (req, res, next) => {
  const { body: options } = req
  const options0 = { "userId":options.userId, "title":options.title, "content":options.content }
  const type = options.type
  try {
    const result = await Test.add(options0)
    const postId = result.insertId

    //console.log(options.type)

    try {    
        const options1 = { "postId":postId, "type": type }
        const result = await TestQ.add(options1)
        return res.status(200).json(result)
    }catch (err) {
        console.log(err) 
            return res.status(500).json({
                msg : err
            })
        }
    return res.status(200).json(result)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: err
    })
  }
}

const index = async (req, res, next) => {
 
  try {
    const result = await Test.get()
    return res.status(200).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      msg: err
    })
  }
}

const Qindex = async (req, res, next) => {
 
    try {
      const result = await Test.get()
      return res.status(200).json(result)
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        msg: err
      })
    }
  }


export {
  add, index, Qindex,
}
