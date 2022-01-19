const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

function verifyToken(req, res, next) {
    // Check role
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.role = decoded.role;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

const auth = {
    verifyToken
};

module.exports = auth;