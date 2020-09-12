import express from 'express'

import { policy } from '../services'

const route = express()

route.get('', async (req, res) => {
    const data = await policy.list()
    res.send(data)
})

route.post('', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Missing body' })
    }
    const item = req.body
    try {
        const result = await (item.id ? policy.update(item) : policy.create(item))
        res.send(result)
    } catch (err) {
        if (/Policy_number_key/.test(err.message)) {
            return res.status(400).send({ message: 'Policy number already taken' })
        }
        throw err
    }
})

route.delete(':id', async (req, res) => {
    const id = req.params.id
    await policy.delete(+id)
    res.send({})
})

export default route
