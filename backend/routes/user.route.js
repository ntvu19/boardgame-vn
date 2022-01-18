const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/', (req, res) => {
    return res.json({ id: '34', name: 'Thanh Vu', age: 20 });
});

module.exports = router;