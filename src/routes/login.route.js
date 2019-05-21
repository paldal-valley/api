import { Router } from 'express'
import { login, check } from '../controllers/login.controller'
import auth from '../middlewares/auth/index'

const router = Router()

router.post('/', login)
// router.get('/check', auth.ensureAuth(), check)

export default router

// login
