// Import packages
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Import modules
const db = require('./config/db.config');
const route = require('./routes');

// Connect to MongoDB
db.connectToDatabase();

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Cors
app.use(cors());

// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));