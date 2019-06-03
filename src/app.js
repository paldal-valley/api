import express from 'express'
import https from 'https'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import 'dotenv/config'
import './utils/module-alias'

import errorHandler from '@middle/error'
import me from '@middle/me'
import api from './routes'

const isTest = process.env.NODE_ENV === 'test'
const PORT = isTest ? process.env.TEST_PORT : process.env.PORT

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(me)
app.use('/', api)
app.use(errorHandler)

const credentials = {
  key: fs.readFileSync(process.env.SSL_PUBLIC_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH),
  passphrase: process.env.SSL_PASSPHRASE
}

const httpsServer = https.createServer(credentials, app)
const server = httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// For API test
export default {
  app,
  server
}
