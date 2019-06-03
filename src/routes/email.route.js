import { Router } from 'express'
import { send_confirm_email, send_password_reset_email } from '../controllers/email.controller'

const router = Router()

router.post('/', send_confirm_email)
router.post('/reset/:email', send_password_reset_email)

export default router