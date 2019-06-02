import { Router } from 'express'
import { addUser, resetUserPassword } from '../controllers/user.controller'
import { emailDupCheck } from '@middle/auth'

const router = Router()

router.post('/', emailDupCheck, addUser)
router.post('/reset/:token', resetUserPassword)

export default router
