import { Router } from 'express'
import { get } from '../controllers/major.controller'
const router = Router()

router.get('/', get)

export default router
