const UserController = require('../controllers/user.controller');
const Auth = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/get-information', Auth.verifyToken, UserController.getUserInformation);
router.put('/edit-information', Auth.verifyToken, UserController.editUserInformation);

/**
 * 1. Active user bằng email
 */

module.exports = router;