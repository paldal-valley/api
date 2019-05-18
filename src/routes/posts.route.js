import { Router } from 'express'
import { addQuestion, index, addAnswer } from '../controllers/posts.controller'
import { getPostPlazaList } from '../controllers/posts.controller'

const router = Router()

router.post('/', addQuestion)
router.post('/answer', addAnswer)

router.get('/plaza', getPostPlazaList)

router.get('/', index)

// router.get('/qna')
// router.get('/:id', indsssex)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
