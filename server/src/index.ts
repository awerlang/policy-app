import express from 'express'
import debug from 'debug'
import helmet from 'helmet'

import { home, policy } from './routes'

const port = 3000

const logger = debug('http')

const app = express()
app.use(helmet())
app.use(express.json())

app.use(async (req, res, next) => {
    // FIXME: improve CORS for development
    if (process.env.NODE_ENV !== 'production') {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }
    next()
})

app.use('/', home)
app.use('/policy', policy)

app.listen(port, () => {
    logger(`Example app listening at http://localhost:${port}`)
})
