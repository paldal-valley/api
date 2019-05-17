import { Router } from 'express'
import { add } from '../controllers/boards.controller'
const router = Router()

router.post('/', add)

export default router

// test1