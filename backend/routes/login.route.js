const LoginController = require('../controllers/login.controller');
const express = require('express');
const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', LoginController.register);
router.post('/logout', LoginController.logout); // Unsuccessfully

module.exports = router;