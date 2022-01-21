const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Users & Administrators
router.get('/view', AuthMiddleware.isAdmin, UserController.view);
router.get('/view/:id', AuthMiddleware.verifyToken, UserController.viewDetails);
router.put('/edit/:id', AuthMiddleware.verifyToken, UserController.edit);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/block/:id', AuthMiddleware.isAdmin, UserController.blockOrUnblockUser);


/**
 * 1. Manage all categories, products (pagination*)
 * 2. Check product binding
 * 3. Manage all orders (and state)
 * 4. Statistic and Analysis (Sales and products)
 * 5. Active by email
 */

module.exports = router;