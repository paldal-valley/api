import { Router } from 'express'
import { getStatics } from '../controllers/static.controller'
const router = Router()

router.get('/', getStatics)

export default router
