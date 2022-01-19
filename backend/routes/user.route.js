const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middlewares');


router.post('/register', UserController.register);
router.post('/login', AuthMiddleware.verifyToken, UserController.login);

module.exports = router;