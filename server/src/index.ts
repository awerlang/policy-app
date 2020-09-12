import express from 'express'
import debug from 'debug'
import helmet from 'helmet'

import { home, policy } from './routes'

const port = 3000

const logger = debug('http')

const app = express()
app.use(helmet())

app.use('/', home)
app.use('/policy', policy)

app.listen(port, () => {
    logger(`Example app listening at http://localhost:${port}`)
})
