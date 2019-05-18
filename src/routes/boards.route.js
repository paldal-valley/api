import { Router } from 'express'
import { add, index } from '../controllers/boards.controller'
import { connection } from '../models/connection'

const router = Router()

router.post('/', add)

router.get('/', index)

// router.get('/qna')
// router.get('/:id', indsssex)

// const index = (req, res, next) => {
//     let qndId = req.params.id
// }

export default router
