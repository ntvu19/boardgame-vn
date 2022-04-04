const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {

    // [GET] /user
    userInformation(req, res, next) {
        if (!req.cookies.token) {
            res.redirect('/')
        } else {
            const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            UserModel.findById(decodedToken.userId)
                .then(user => {
                    if (!user) {
                        res.redirect('/')
                    } else {
                        res.render('info', {
                            layout: 'customer',
                            user: user ? user.toObject() : user
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    }

    // [PUT] /user/edit/:id
    editUser(req, res, next) {
        const newPassword = req.body.newPassword
        delete req.body.newPassword
        delete req.body.confirmNewPassword

        // Hashing password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hashed) => {
                req.body.password = hashed
                if (!req.cookies.token) {
                    res.redirect('/')
                } else {
                    const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
                    UserModel.findByIdAndUpdate(decodedToken.userId, req.body)
                        .then(() => res.redirect('/user'))
                        .catch(err => console.log(err))
                }
            })
        })
    }

}

module.exports = new UserController()