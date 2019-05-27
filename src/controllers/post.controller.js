import Post from '@dao/posts'
import PostPlaza from '@dao/posts_plazas'
import PostQuestion from '@dao/posts_questions'
import PostAnswer from '@dao/posts_answers'
import PostReview from '@dao/posts_review'

const addPost = async (req, res, next) => {
  try {
    const { body: payload } = req
    const result = await Post.addOne(payload)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params
    const result = await Post.getOne(postId)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getPostList = async (req, res, next) => {
  try {
    const result = await Post.getList()
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { postId } = req.params
    const result = await Post.updateOne(postId, payload)

    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}


const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params
    const result = await Post.deleteOne(postId)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

/* ------------ Question ------------- */

const getPostQuestion = async (req, res, next) => {
  try {
    const { postId = 0 } = req.params
    const { query: options } = req.query
    const result = await PostQuestion.getOne(postId, options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getPostQuestionList = async (req, res, next) => {
  try {
    const { query: options } = req
    const result = await PostQuestion.getList(options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const addPostQuestion = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { categoryId } = req.query
    const { insertId: postId } = await Post.addOne(payload)

    const result = await PostQuestion.addOne({ postId, categoryId })
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const updatePostQuestion = async (req, res, next) => {
  try {
    // TODO: 나중에 카테고리 변경 등 세부테이블 변경도 같이 일어나도록 수정하기
    const { body: payload } = req
    const { categoryId } = req.query
    const { postId } = req.params
    await Post.updateOne(postId, payload)

    await PostQuestion.updateOne(postId, { categoryId })

    return res.status(200).json({ success: true })
  } catch (err) {
    return next(err)
  }
}


/* ------------ Answer ------------- */

// const getPostAnswer = async (req, res, next) => {
//   try {
//     const { postId = 0 } = req.params
//     const { query: options } = req.query
//     const result = await PostQuestion.getOne(postId, options)
//     return res.status(200).json(result)
//   } catch (err) {
//     return next(err)
//   }
// }

const getPostAnswerList = async (req, res, next) => {
  try {
    const { query: options } = req
    const result = await PostAnswer.getList(options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const addPostAnswer = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { postId_Q } = req.query
    const { insertId: postId } = await Post.addOne(payload)

    const result = await PostAnswer.addOne({ postId, postId_Q })
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

// const updatePostAnswer = async (req, res, next) => {
//   try {
//     // TODO: 나중에 카테고리 변경 등 세부테이블 변경도 같이 일어나도록 수정하기
//     const { body: payload } = req
//     const { categoryId } = req.query
//     const { postId } = req.params
//     await Post.updateOne(postId, payload)

//     await PostAnswer.updateOne(postId, { categoryId })

//     return res.status(200).json({ success: true })
//   } catch (err) {
//     return next(err)
//   }
// }



/* ------------ Plaza ------------- */

const getPostPlaza = async (req, res, next) => {
  try {
    const { postId = 0 } = req.params
    const { query: options } = req.query
    const result = await PostPlaza.getOne(postId, options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getPostPlazaList = async (req, res, next) => {
  try {
    const { query: options } = req
    const result = await PostPlaza.getList(options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const addPostPlaza = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { categoryId } = req.query
    const { insertId: postId } = await Post.addOne(payload)

    const result = await PostPlaza.addOne({ postId, categoryId })
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const updatePostPlaza = async (req, res, next) => {
  try {
    // TODO: 나중에 카테고리 변경 등 세부테이블 변경도 같이 일어나도록 수정하기
    const { body: payload } = req
    const { categoryId } = req.query
    const { postId } = req.params
    await Post.updateOne(postId, payload)

    await PostPlaza.updateOne(postId, { categoryId })

    return res.status(200).json({ success: true })
  } catch (err) {
    return next(err)
  }
}


/* ------------ Review ------------- */

const addPostReview = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { categoryId } = req.query
    const { insertId: postId } = await Post.addOne(payload)

    const result = await PostReview.addOne({ postId, categoryId })
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getPostReview = async (req, res, next) => {
  try {
    const { postId = 0 } = req.params
    const { query: options } = req.query
    const result = await PostReview.getOne(postId, options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getPostReviewList = async (req, res, next) => {
  try {
    const { query: options } = req
    const result = await PostReview.getList(options)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const updatePostReview = async (req, res, next) => {
  try {
    // TODO: 나중에 카테고리 변경 등 세부테이블 변경도 같이 일어나도록 수정하기
    const { body: payload } = req
    const { categoryId } = req.query
    const { postId } = req.params
    await Post.updateOne(postId, payload)

    await PostReview.updateOne(postId, { categoryId })

    return res.status(200).json({ success: true })
  } catch (err) {
    return next(err)
  }
}


export {
  getPost,
  getPostList,
  addPost,
  updatePost,
  deletePost,
  getPostPlaza,
  getPostPlazaList,
  addPostPlaza,
  updatePostPlaza,
  getPostQuestion,
  getPostQuestionList,
  addPostQuestion,
  updatePostQuestion,
  getPostReview,
  getPostReviewList,
  addPostReview,
  updatePostReview,
  getPostAnswerList,
  addPostAnswer,
}
