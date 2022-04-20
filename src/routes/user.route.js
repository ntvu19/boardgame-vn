const UserController = require('../controllers/user.controller')
const Auth = require('../middlewares/auth.middleware')
const express = require('express')
const router = express.Router()

// Official

router.get('/active/:id', UserController.activeUser)
router.put('/edit/:id', UserController.editUser)
router.get('/', UserController.userInformation)

module.exports = router