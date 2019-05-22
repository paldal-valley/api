import { Router } from 'express'
import { tryLogin } from '../controllers/login2.controller'

const router = Router()

router.post('/', tryLogin)

export default router
