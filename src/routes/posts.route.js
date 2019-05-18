import { Router } from 'express'
import { add } from '../controllers/boards.controller'
import { getPostPlazaList } from '../controllers/posts.controller'
const router = Router()

router.post('/', add)
router.get('/plaza', getPostPlazaList)

export default router

// test1
