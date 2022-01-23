const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Order


/**
 * 1. View the detail of an order
 * 2. Create an order
 * 3. Update the state or any data of an order
 * 4. Remove an order
 */

module.exports = router;