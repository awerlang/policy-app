import express from 'express'

const route = express()

route.get('/', (req, res) => {
    res.send('Hello World!')
})

export default route
