import { Router } from 'express'
import {
  addQuestion,
  index,
  addAnswer,
  getPostId,
  getAnswers,
  getPostPlaza,
  getPostPlazaList,
  addPostPlaza,
  updatePostPlaza,
  deletePost,
  getPostQnAList,
  getPostQnA,
  addPostQnA,
  getPostReviewList,
  getPostReview,
  addPostReview
} from '../controllers/posts.controller'

const router = Router()

router.get('/', index)
//router.post('/', addQuestion)
router.post('/answer', addAnswer)
// router.get('/qna/:id', getPostId) //readQ
router.get('/readA/:id', getAnswers)
router.get('/readQ/:id', getPostId)


router.delete('/:postId', deletePost)

// plaza
router.get('/plaza', getPostPlazaList)
router.post('/plaza', addPostPlaza)

router.get('/plaza/:postId', getPostPlaza)
router.put('/plaza/:postId', updatePostPlaza)

//qna modifying
router.get('/qna',getPostQnAList)
router.post('/qna', addPostQnA)

router.get('/qna/:postId',getPostQnA)
//router.put('/qna/:postId', updatePostQnA)

//reveiw modifying
router.get('/review',getPostReviewList)
router.post('/review', addPostReview)
//router.post('/qna', addPostQnA)

router.get('/review/:postId',getPostReview)
//router.put('/qna/:postId', updatePostQnA)




//router.get('/questions', Qindex)
//router.get('/:id', getPostId)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
