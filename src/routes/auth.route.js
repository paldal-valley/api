import { Router } from 'express'
import { authCheck, tryLogin, authFetch } from '../controllers/auth.controller'
import { isLoggedIn } from '@middle/auth'
const router = Router()

router.get('/', isLoggedIn, authCheck)
router.get('/fetch', isLoggedIn, authFetch)
router.post('/login', tryLogin)

export default router
