import { Router } from 'express'
import {
  addQuestion,
  index,
  addAnswer,
  getPostId,
  getAnswers,
  getPostPlaza,
  getPostPlazaList,
} from '../controllers/posts.controller'

const router = Router()

router.post('/', addQuestion)
router.post('/answer', addAnswer)
router.get('/readQ/:id',getPostId)
router.get('/readA/:id',getAnswers)

router.get('/plaza', getPostPlazaList)
router.get('/plaza/:postId', getPostPlaza)

router.get('/', index)

//router.get('/questions', Qindex)
//router.get('/:id', getPostId)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
