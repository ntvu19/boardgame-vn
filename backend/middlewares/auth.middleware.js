const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        if (['admin', 'user'].includes(jwt.verify(token, process.env.SECRET_KEY).role)) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
}

function isAdmin(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        if (jwt.verify(token, process.env.SECRET_KEY).role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                message: 'Required administrator role',
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
}

function isUser(req, res, next) {
    // Do something
}

const auth = {
    verifyToken,
    isAdmin,
    isUser,
};

module.exports = auth;