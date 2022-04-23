const AdminModel = require('../models/admin.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const isAdmin = (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect('/admin/login')
    } else {
        const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        AdminModel.findById(decodedToken.userId)
            .then(admin => admin ? next() : res.redirect('/admin/login'))
            .catch(err => res.status(400).send({ message: err }))
    }
}

const auth = {
    isAdmin,
}

module.exports = auth