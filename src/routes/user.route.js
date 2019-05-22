import { Router } from 'express'
import { addUser } from '../controllers/users.controller'
import { emailDupCheck } from '@middle/auth'

const router = Router()

router.post('/', emailDupCheck, addUser)

export default router
