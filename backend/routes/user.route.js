const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Users & Administrators
router.get('/view', AuthMiddleware.isAdmin, UserController.view);
router.get('/view/:id', AuthMiddleware.verifyToken, UserController.viewDetails);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/:blockMethod/:id', AuthMiddleware.isAdmin, UserController.blockOrUnblockUser);

/**
 * 1. Change themselves information
 * 2. Manage all categories, products (pagination*)
 * 3. Check product binding
 * 4. Manage all orders (and state)
 * 5. Statistic and Analysis (Sales and products)
 */

// Product





module.exports = router;