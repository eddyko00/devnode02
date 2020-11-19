'use strict'
const createError = require('http-errors')
const express = require('express')
const pino = require('express-pino-logger')
const { LOG_LEVEL = 'info' } = process.env
const logger = require('pino')({ level: LOG_LEVEL })

const helloRouter = require('./routes/hello')
const todoRouter = require('./routes/todo')
const database = require('./lib/database')

const app = express()
app.logger = logger

app.use(pino({ logger }))
//app.use(database('mongodb://localhost/workshop'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', helloRouter)
app.use('/todo', todoRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404)) })

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
