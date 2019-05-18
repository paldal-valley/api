import Test from '../models/posts/index'
import TestQ from '../models/posts/posts_questions'
import PostPlaza from '@dao/posts_plazas'

// import PostQuestion from '../models/boards'
const add = async (req, res, next) => {
  const { body: options } = req
  const options0 = { "userId":options.userId, "title":options.title, "content":options.content }
  const type = options.type
  try {
    const result = await Test.add(options0)
    const postId = result.insertId
      // 근데 여기서 insert_id가 아무 것도 안찍힘. 뭔지 알아봐야 함.
    console.log(options.type)
//방금 인서트한 postId를 불러올 수 있음.
//그리고 추가로 type을 받아온 다음에s
//Test 말고 다른 객체를 하나 선언하고
//그 객체에서 add를 시켜줌.
//모델 밑에 다른 이름을 선언해서 add 함수를 선언해주고
//쿼리문에 이름을 posts_questions로 지정해주면 되는 부분.
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

const getPostPlazaList = async (req, res, next) => {
  try {
    const result = await PostPlaza.getList()
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

export {
  add, index, getPostPlazaList
}
