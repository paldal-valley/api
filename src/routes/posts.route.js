import { Router } from 'express'
import { add, index, getPostId } from '../controllers/posts.controller'

const router = Router()

router.post('/', add)
router.get('/readQ/:id', getPostId)

router.get('/', index)

//router.get('/questions', Qindex)
//router.get('/:id', getPostId)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
