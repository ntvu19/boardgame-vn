// Environment variables
require('dotenv').config()

// Third-party libraries
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')

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

// Template engine
app.engine('hbs', handlebars.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'public', 'views'))

var hbs = require('handlebars');
hbs.registerHelper("plusOne", function(value, options)
{
    return parseInt(value) + 1;
});

// Routes init
route(app)

// Open PORT
app.listen(PORT)