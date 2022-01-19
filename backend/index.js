// Import packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import modules
const db = require('./config/db.config');
const route = require('./routes');

// Connect to MongoDB
db.connectToDatabase();

// Cors
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));