import { Router } from 'express'
import {
  updateOne,
  deleteOne
} from '../controllers/comment.controller'

const router = Router()

// TODO: hasComment 미들웨어 추가 필요
import { isLoggedIn } from '@middle/auth'

router.put('/:commentId', updateOne)
router.delete('/:commentId', deleteOne)

export default router
