const express = require('express')
const app = express()
require('./db/mongoose')
const exphbs = require('express-handlebars')
const port = process.env.PORT || 3000
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
})
const bodyParser = require('body-parser')
// require controllers
const shortenController = require('../controllers/shorten')
const homeController = require('../controllers/home')

// setup handlebars engine and file extension
app.engine(hbs.extname, hbs.engine, hbs.defaultLayout)
app.set('view engine', hbs.extname)

// import body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// static files
app.use(express.static("public"))

// controllers
app.get('/', homeController)
app.post('/shorten', shortenController.shortenURL)
app.get('/:urlId', shortenController.originalURL)

// set up listening on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})