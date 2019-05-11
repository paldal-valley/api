import { Router } from 'express'
import { add, login } from '../controllers/users.controller'
const router = Router()

router.post('/', add)
router.post('/login', login)

export default router

// user