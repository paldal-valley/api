import Post from '@dao/posts'
import PostPlaza from '@dao/posts_plazas'
import PostQuestion from '@dao/posts_questions'
import PostAnswer from '@dao/posts_answers'
import PostReview from '@dao/posts_review'
import User from '@dao/users'
import Comment from '@dao/comments'
import Like from '@dao/likes'
import {
  web3,
  getContract,
  blockMeta,
  transactionAdapter
} from '../utils'

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
    const doajouContract = await getContract()
    const { postId } = req.params

    // 만약 질문 게시글을 삭제한다면 수수료 발생
    const postQuestion = await PostQuestion.getOne(postId)
    const guarantee = await doajouContract.methods.getQuestionGuarantee(postQuestion.id).call()
    console.log('guarantee')
    console.log(guarantee)
    if (Object.keys(postQuestion).length && guarantee) {

      const txCount = await web3.eth.getTransactionCount(blockMeta.wallet.address.manager, 'pending')
      const data = await doajouContract.methods.removeQuestion(postQuestion.id).encodeABI()

      const txObject = {
        from: blockMeta.wallet.address.manager,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        to: blockMeta.contractAddress,
        chainId: 3,
        data,
      }

      const signed = await web3.eth.accounts.signTransaction(txObject, blockMeta.wallet.privKey.manager)
      web3.eth.sendSignedTransaction(signed.rawTransaction)


    }
    const result = await Post.deleteOne(postId)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const getWriteUser = async (req, res, next) =>{
  try{
    //const { body: payload } = req
    const { postId } = req.params
    const result = await Post.getWriteUser(postId)
    return res.status(200).json(result)
  }
  catch(err){
    return next(err)
  }
}




const updatePostView = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { postId } = req.params
    const result = await Post.updateOne(postId, payload)

    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const likePost = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { postId } = req.params

    const likeId = await Like.check(postId, payload.userId)
    if (likeId) {
      Like.destroy(likeId)
      res.status(200).json({ success: true, msg: "delete" })
    } else {
      payload.refId = postId
      Like.addOne(payload)
      res.status(200).json({ success: true, msg: "create" })
    }
  } catch (err) {
    next(err)
  }
}

/* ------------ Question ------------- */

const getPostQuestion = async (req, res, next) => {
  try {
    const { postId = 0 } = req.params
    const { query: options } = req.query
    const comments = await Comment.getListByPostId(postId)
    const post = await PostQuestion.getOne(postId, options)

    return res.status(200).json({
      ...post,
      comments
    })
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

const getPostUnselectedQuestionList = async (req, res, next) => {
  try {
    const { query: options } = req
    const result = await PostQuestion.getUnselectedList(options)
    console.log(result)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const addPostQuestion = async (req, res, next) => {
  try {
    const { body } = req
    const { post, postQuestion, questionerWalletAddress, transactionHash } = body
    // const { reward: postQuestion } = postQuestion
    const { categoryId } = req.query
    const { insertId: postId } = await Post.addOne(post)

    let { reward } = postQuestion

    if (typeof transactionHash === 'undefined') reward = 0

    //채택 넣기
    const result = await PostQuestion.addOne({ postId, categoryId, reward })
    if (typeof transactionHash !== 'undefined') {
      const doajouContract = await getContract()
      const txCount = await web3.eth.getTransactionCount(blockMeta.wallet.address.manager, 'pending')
      const data = await doajouContract.methods.questionCreated(
        questionerWalletAddress,
        result.insertId,
        reward * Math.pow(10, 18)
      ).encodeABI()

      const txObject = {
        from: blockMeta.wallet.address.manager,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        to: blockMeta.contractAddress,
        chainId: 3,
        data,
      }

      const signed = await web3.eth.accounts.signTransaction(txObject, blockMeta.wallet.privKey.manager)
      web3.eth.sendSignedTransaction(signed.rawTransaction)

      // await transactionAdapter(
      //   'questionCreated',
      //   [
      //     questionerWalletAddress,
      //     result.insertId,
      //     reward * Math.pow(10, 18)
      //   ],
      //   {
      //     from: blockMeta.wallet.address.manager,
      //     gasLimit: web3.utils.toHex(800000)
      //   },
      //   blockMeta.wallet.privKey.manager
      // )
    }
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

const updatePostQuestion = async (req, res, next) => {
  try {
    // TODO: 나중에 카테고리 변경 등 세부테이블 변경도 같이 일어나도록 수정하기
    const { body } = req
    const { post, postQuestion } = body
    const { categoryId } = req.query
    const { reward } = postQuestion
    const { postId } = req.params
    await Post.updateOne(postId, post)

    await PostQuestion.updateOne(postId, { categoryId, reward })

    return res.status(200).json({ success: true })
  } catch (err) {
    return next(err)
  }
}

const getPostSelected = async (req, res, next) => {
  try {
    const { postId_Q } = req.params
    const result = await PostQuestion.getPostSelected(postId_Q)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

/* ------------ Answer ------------- */



const getPostAnswer = async (req, res, next) => {
  try {
    const { postId = 0 } = req.params
    const { query: options } = req.query
    const result = await PostAnswer.getOne(postId, options)
    console.log(result)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

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

const updatePostAnswer = async (req, res, next) => {
  try {
    // TODO: 나중에 카테고리 변경 등 세부테이블 변경도 같이 일어나도록 수정하기
    const { body: payload } = req
    const { postId } = req.params
    await Post.updateOne(postId, payload)

    return res.status(200).json({ success: true })
  } catch (err) {
    return next(err)
  }
}

const selectPostAnswer = async (req, res, next) => {
  try {
    const { postId_Q } = req.body
    const { isSelected } = req.query
    const { postId } = req.params

    await PostAnswer.selectOne(postId, { isSelected })

    const { reward } = await PostQuestion.getOneByPostQuestion(postId_Q)

    // reward가 없는 질문에서는 수행하지 않는다.
    if (reward) {
      const doajouContract = await getContract()
      const { userId } = await Post.getOne(postId)
      const { walletAddress: answerer } = await User.getOne(userId)

      const txCount = await web3.eth.getTransactionCount(blockMeta.wallet.address.manager, 'pending')
      const data = await doajouContract.methods.answerSelected(postId_Q, answerer).encodeABI()

      const txObject = {
        from: blockMeta.wallet.address.manager,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        to: blockMeta.contractAddress,
        chainId: 3,
        data,
      }

      const signed = await web3.eth.accounts.signTransaction(txObject, blockMeta.wallet.privKey.manager)
      web3.eth.sendSignedTransaction(signed.rawTransaction)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    return next(err)
  }
}


const checkSelected = async (req, res, next) => {
  try {
    const { postId_Q } = req.params
    const result = await PostAnswer.getSelected(postId_Q)
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

/* ------------ Plaza ------------- */

const getPostPlaza = async (req, res, next) => {
  try {
    const { postId = 0 } = req.params
    const { query: options } = req.query
    const comments = await Comment.getListByPostId(postId)
    const post = await PostPlaza.getOne(postId, options)

    return res.status(200).json({
      ...post,
      comments
    })
  } catch (err) {
    return next(err)
  }
}

// TODO: 댓글 개수 함께 리턴하기
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
    const comments = await Comment.getListByPostId(postId)
    const post = await PostReview.getOne(postId, options)
    const likes = await Like.getList(postId)
    // console.log(likes)
    return res.status(200).json({
      ...post,
      comments,
      likes
    })
  } catch (err) {
    return next(err)
  }
}

const getPostReviewList = async (req, res, next) => {
  try {
    const { query: options } = req
    const result = await PostReview.getList(options)
    // console.log(result)
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
  getWriteUser,
  addPost,
  updatePost,
  deletePost,
  getPostPlaza,
  getPostPlazaList,
  addPostPlaza,
  updatePostPlaza,
  getPostQuestion,
  getPostQuestionList,
  getPostUnselectedQuestionList,
  addPostQuestion,
  updatePostQuestion,
  getPostReview,
  getPostReviewList,
  addPostReview,
  updatePostReview,
  getPostAnswerList,
  addPostAnswer,
  getPostAnswer,
  updatePostAnswer,
  selectPostAnswer,
  checkSelected,
  updatePostView,
  likePost,
  getPostSelected
}
