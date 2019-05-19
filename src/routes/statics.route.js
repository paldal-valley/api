import { Router } from 'express'
import { getStatics } from '../controllers/statics.controller'
const router = Router()

router.get('/', getStatics)

export default router
