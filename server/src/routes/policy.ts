import express from 'express'

import { ClientError } from '../util/errors'
import { policy } from '../services'

const route = express()

route.get('/', async (req, res) => {
    const result = await policy.list()
    res.send(result)
})

route.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await policy.get(+id)
    if (result instanceof ClientError) {
        return res.status(400).send({ message: result.message })
    }
    res.send(result)
})

route.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Missing body' })
    }
    const item = req.body
    const result = await (item.id ? policy.update(item) : policy.create(item))
    if (result instanceof ClientError) {
        return res.status(400).send({ message: result.message })
    }
    res.send(result)
})

route.delete('/:id', async (req, res) => {
    const id = req.params.id
    await policy.remove(+id)
    res.send({})
})

export default route
