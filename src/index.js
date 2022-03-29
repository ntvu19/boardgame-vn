// Environment variables
require('dotenv').config()

// Third-party libraries
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')

// Local file
const route = require('./routes')
const db = require('./configs/db.config')

// PORT
const app = express()
const PORT = process.env.PORT || 5000

// Database
db.connectToDatabase()

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Method override
app.use(methodOverride('_method'))

// Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'public', 'views'))

// Routes init
route(app)

// Open PORT
app.listen(PORT)