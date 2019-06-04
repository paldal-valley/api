import { Router } from 'express'
import { addUser, resetUserPassword, updateUser} from '../controllers/user.controller'
import { emailDupCheck, isMyself } from '@middle/auth'

const router = Router()

router.post('/', emailDupCheck, addUser)
router.post('/reset/:token', resetUserPassword)
router.put('/:userId', isMyself, updateUser)


export default router
