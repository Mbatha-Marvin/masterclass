const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 8080
const {errorHandler} = require('./middlewares/errorMiddleware')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api',require('./routes/apiRoutes'))

app.use(errorHandler)
// console.log(process.env.PORT)
// console.log(process.env.NODE_ENV)

app.listen(port, () => console.log(`Server is running on port ${port}`))