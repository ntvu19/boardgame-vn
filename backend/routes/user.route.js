const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middlewares');

// Users & Administrators
router.post('/register', UserController.register);
router.post('/login', AuthMiddleware.verifyToken, UserController.login);
router.put('/:blockMethod/:id', AuthMiddleware.isAdmin, UserController.blockOrUnblockUser);


/**
 * 1. Administrators can view all user's information (pagination*)
 * 2. Change themselves information
 * 3. Manage all categories, products (pagination*)
 * 4. Check product binding
 * 5. Manage all orders (and state)
 * 6. Statistic and Analysis (Sales and products)
 */

// Product





module.exports = router;