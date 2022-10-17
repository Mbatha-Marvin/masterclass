const express = require("express")
const expressWinston = require('express-winston')
const {transports, format, level} = require('winston')

const app = express()
const port = 3000

app.use(expressWinston.logger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'logWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'logErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
    statusLevels: true
}))

// app.use(morgan('Method: :method url localhost::url sent on :date[web] http version :http-version'))


app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.get('/400', (req, res) => {
    res.sendStatus(400)
})

app.get('/500', (req, res) => {
    res.sendStatus(500)
})

app.get('/error', (req, res) => {
    throw new Error('This is a custom error')
})

const myFormat = format.printf(({level, meta, timestamp}) => {
    return `${timestamp} ${level}: ${meta.message}`
})

app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: 'logInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat
    )
}))

app.listen(port, () => {
    console.log(" app running on port 3000")
})