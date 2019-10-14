const express = require('express')
const app = express()
require('./db/mongoose')
const exphbs = require('express-handlebars')
const port = process.env.PORT || 3000
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
})
// require controllers
const shortenController = require('../controllers/shorten')
const homeController = require('../controllers/home')

// check if not in production mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// setup handlebars engine and file extension
app.engine(hbs.extname, hbs.engine, hbs.defaultLayout)
app.set('view engine', hbs.extname)

// static files
app.use(express.static("public"))

// controllers
app.use('/', homeController)
// app.use('/shorten', shorten)
// app.use('/:shortenedUrl', shorten)

// set up listening on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})