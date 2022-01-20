const jwt = require('jsonwebtoken');

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
        } else {
            return res.status(401).json({ message: 'Required Administrator role' });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

const auth = {
    verifyToken,
    isAdmin
};

module.exports = auth;