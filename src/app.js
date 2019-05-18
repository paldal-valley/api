import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import './utils/module-alias'

import api from './routes'
import errorHandler from '@middle/error'

const app = express()
app.set('port', process.env.PORT || 8000)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/', api)
app.use(errorHandler)



const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})

// For API test
export default {
  app,
  server
}
