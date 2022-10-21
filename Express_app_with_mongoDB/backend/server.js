const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port  = process.env.PORT || 8080

connectDB()

const app = express()

// Adding middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/movies', require('./routes/movieRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`server is running on port ${port}`))
