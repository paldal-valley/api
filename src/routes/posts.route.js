import { Router } from 'express'
import { add, index } from '../controllers/boards.controller'
import { getPostPlazaList } from '../controllers/posts.controller'

const router = Router()

router.post('/', add)
router.get('/plaza', getPostPlazaList)

router.get('/', index)

// router.get('/qna')
// router.get('/:id', indsssex)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
