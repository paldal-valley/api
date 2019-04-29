import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import api from './routes'

const app = express()
// Test Comment
app.set('port', process.env.PORT || 3001)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  urlencoded: true,
  limit: '50mb',
  parameterLimit: 1000000
}))
app.use('/', api)

const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})

// For API test
export default {
  app,
  server
}
