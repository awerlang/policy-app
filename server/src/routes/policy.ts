import express from 'express'

import { ClientError } from '../util/errors'
import { policy } from '../services'
import { PolicyItem } from '../shared/types';

const route = express()
route.use(express.json())

route.get('/', async (req, res) => {
    const result = await policy.list()
    res.send(result)
})

route.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await policy.get(Number(id))
    if (result instanceof ClientError) {
        return res.status(400).send({ message: result.message })
    }
    res.send(result)
})

route.post('/', async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: 'Missing required data' })
    }
    const item: PolicyItem = req.body
    const result = await (item.id ? policy.update(item) : policy.create(item))
    if (result instanceof ClientError) {
        return res.status(400).send({ message: result.message })
    }
    res.send(result)
})

route.delete('/:id', async (req, res) => {
    const id = req.params.id
    await policy.remove(Number(id))
    res.send({})
})

export default route
