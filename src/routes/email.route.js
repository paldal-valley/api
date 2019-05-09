import { Router } from 'express'
import { add, send_confirm_email } from '../controllers/emails.controller'

const nodemailer = require("nodemailer");
const router = Router()

router.post('/', send_confirm_email)

export default router

// test1