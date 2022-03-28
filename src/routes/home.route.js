const HomeController = require('../controllers/home.controller')
const express = require('express')
const router = express.Router()

router.get('/', HomeController.index)

module.exports = router