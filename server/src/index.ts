import express, { Request, Response, NextFunction } from 'express'
import debug from 'debug'
import helmet from 'helmet'

import { home, policy } from './routes'

const port = 3000

const logger = debug('http')

const app = express()
app.use(helmet())
app.use(express.json())

app.use('/', home)
app.use('/api/policy', policy)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // TODO: store non-business errors
    console.log(req.path)
    console.error(err)
    res.status(500).send({ message: 'Could not complete the operation. Please try again later.' })
})

app.listen(port, () => {
    logger(`Example app listening at http://localhost:${port}`)
})
