const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LoginController {

    /**
     * @route [POST] /api/login
     * @desc Log in
     * @access public
     */
    login(req, res, next) {
        UserModel.findOne({
                username: req.body.username
            })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: 'Incorrectly username or password',
                    });
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(success => {
                        if (!success) {
                            return res.status(401).json({
                                message: 'Incorrectly username or password',
                            });
                        }
                        return res.status(200).json({
                            userId: user._id,
                            username: user.username,
                            role: 'user',
                            token: user.token
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: err,
                        });
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            });
    }

    /**
     * @route [POST] /api/register
     * @desc Register
     * @access public
     */
    register(req, res, next) {
        UserModel.findOne({
                username: req.body.username,
            })
            .then(user => {
                if (user) {
                    return res.status(400).json({
                        message: 'The User Has Already Existed',
                    });
                }
                const newUser = new UserModel(req.body);

                // Generating a token
                const token = jwt.sign({
                    userId: newUser._id,
                    username: newUser.username,
                    role: 'user',
                }, process.env.SECRET_KEY);
                newUser.token = token;

                // Hashing password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                        newUser.password = hashedPassword;
                        // Save the new user to database
                        newUser.save()
                            .then(() => {
                                return res.status(200).json({
                                    message: 'Sign Up Successfully',
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    message: err,
                                });
                            });
                    });
                });

            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            });
    }

    /**
     * @route [POST] /api/logout
     * @desc Log out
     * @access private
     */
    logout(req, res, next) {
        // Do something
    }


}

module.exports = new LoginController();