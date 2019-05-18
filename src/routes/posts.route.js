import { Router } from 'express'
import { add, index, Qindex } from '../controllers/posts.controller'
import { connection } from '../models/connection'

const router = Router()

router.post('/', add)

router.get('/', index)

router.get('/questions', Qindex)
// router.get('/:id', indsssex)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
