// Environment variables
require('dotenv').config()

// Third-party libraries
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyparser = require('body-parser');

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

app.use(bodyparser.urlencoded({
    extended :true
}));
app.use(bodyparser.json());

app.use(express.urlencoded({ limit: '2mb', extended: true }))
app.use(express.json({ limit: '2mb' }))

// CORS
// app.use(cors())

// Cookie parser
app.use(cookieParser())

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

var hbs = require('handlebars');
hbs.registerHelper("plusOne", function(value, options)
{
    return parseInt(value) + 1;
});

// Routes init
route(app)

// Open PORT
app.listen(PORT)