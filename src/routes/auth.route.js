import { Router } from 'express'
import { authCheck, tryLogin } from '../controllers/auth.controller'
import { isLoggedIn } from '@middle/auth'
const router = Router()

router.get('/', isLoggedIn, authCheck)
router.post('/login', tryLogin)

export default router
