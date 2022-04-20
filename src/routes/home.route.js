const HomeController = require('../controllers/home.controller')
const express = require('express')
const router = express.Router()

router.get('/logout', HomeController.userLogOut)
router.post('/register', HomeController.userRegister)
router.post('/login', HomeController.userLogIn)
router.get('/login', HomeController.userLogInPage)
router.get('/', HomeController.index)

module.exports = router