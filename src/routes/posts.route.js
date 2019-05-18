import { Router } from 'express'
import { addQuestion, index, addAnswer, getPostId } from '../controllers/posts.controller'
import { getPostPlazaList } from '../controllers/posts.controller'

const router = Router()

router.post('/', addQuestion)
router.post('/answer', addAnswer)
router.post('/readQ/:id',getPostId)

router.get('/plaza', getPostPlazaList)

router.get('/', index)

//router.get('/questions', Qindex)
//router.get('/:id', getPostId)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
