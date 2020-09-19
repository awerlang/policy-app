import express from 'express'
import path from 'path'

const route = express()

route.use(express.static(path.join(__dirname, '../client')))

route.get('/', (req, res) => {
    res.redirect('/index.html')
})

export default route
