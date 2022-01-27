// Environment variables
require('dotenv').config();

// Third-party library
const express = require('express');
const cors = require('cors');

// Local files
const route = require('./routes');
const db = require('./configs/db.config');

// PORT
const app = express();
const PORT = process.env.PORT || 5000;

// Database
db.connectToDatabase();

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
route(app);

// Listening
app.listen(PORT);