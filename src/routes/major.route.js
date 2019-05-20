import { Router } from 'express'
import { get } from '../controllers/majors.controller'
const router = Router()

router.get('/', get)

export default router
