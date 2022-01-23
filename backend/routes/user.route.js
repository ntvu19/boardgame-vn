const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

// Users & Administrators
router.get('/view-info', AuthMiddleware.isAdmin, UserController.view);
router.get('/view-info/:id', AuthMiddleware.verifyToken, UserController.viewDetails);
router.put('/edit/:id', AuthMiddleware.verifyToken, UserController.edit);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/block/:id', AuthMiddleware.isAdmin, UserController.blockOrUnblockUser);


/**
 * 1. View the detail of an order
 * 2. Manage all orders (and state)
 * 3. Active by email
 * 4. View all order of a user
 */

module.exports = router;