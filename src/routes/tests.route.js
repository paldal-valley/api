import { Router } from 'express'
import { add, get } from '../controllers/tests.controller'
const router = Router()

router.post('/', add)

router.get('/', get)

export default router

// test1