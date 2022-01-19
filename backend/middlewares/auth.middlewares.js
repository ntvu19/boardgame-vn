const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

function verifyToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
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

function isAdmin(req, res, next) {
    // Check role
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.role === 'Administrator') {
            req.body.role = decoded.role;
            next();
        }
    } catch (err) {
        return res.status(403).json({ message: 'Required Aministrator role' });
    }
}

const auth = {
    verifyToken,
    isAdmin
};

module.exports = auth;