import { Router } from 'express'
import { add } from '../controllers/users.controller'
const router = Router()

router.post('/', add)

export default router

// user