import express from 'express'
import { db } from '../data'

const route = express()

route.get('', async (req, res) => {
    const data = await db.one('SELECT $1 AS value', 123)
    res.send(data.value)
})

export default route
