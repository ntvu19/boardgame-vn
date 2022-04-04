const UserController = require('../controllers/user.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()

// Official

router.put('/edit/:id', UserController.editUser)
router.get('/', UserController.userInformation)

module.exports = router