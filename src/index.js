const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT || 5000

// app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
app.use('/users',userRoutes)

app.listen(port,()=>console.log('server is up and running',port))