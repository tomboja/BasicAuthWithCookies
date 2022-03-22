require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const environment = process.env
const routes = require('./api/routes')

const auth = require('./utils/authentication')

const app = express()

app.use(function (req, res, next) {
  console.log("Request method: ", req.method)
  console.log("Request URL: ", req.url)
  next()
})
app.use(logger('dev'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Check authentication before going to any of the routes
app.use(cookieParser(environment.SIGNATURE))
app.use(auth.authentication)
app.use('/api', routes)

const server = app.listen(environment.PORT, function () {
  const port = server.address().port
  console.log(`${environment.SERVER_RUNING} ${port}`)
})
