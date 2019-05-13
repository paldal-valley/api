import { Router } from 'express'
import { add, index } from '../controllers/boards.controller'
import { connection } from '../models/connection'

const router = Router()

router.post('/', add)

router.get('/', index)

export default router
