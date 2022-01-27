const LoginController = require('../controllers/login.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/login', LoginController.login);
router.post('/logout', LoginController.logout); // Unsuccessfully

module.exports = router;