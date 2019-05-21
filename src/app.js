import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import './utils/module-alias'

import errorHandler from '@middle/error'
import me from '@middle/me'
import api from './routes'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(me)
app.use('/', api)
app.use(errorHandler)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

// For API test
export default {
  app,
  server
}
