const UserModel = require('../models/user.model');
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
            .then(data => {
                if (!data) {
                    return res.status(401).json({
                        message: 'Incorrectly username or password',
                    });
                }
                bcrypt.compare(req.body.password, data.password)
                    .then(success => {
                        if (success === false) {
                            return res.status(401).json({
                                message: 'Incorrectly username or password',
                            });
                        }
                        return res.status(200).json({
                            userId: data._id,
                            username: data.username,
                            role: 'user',
                            token: data.token
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
     * @route [POST] /api/logout
     * @desc Log out
     * @access private
     */
    logout(req, res, next) {
        // Do something
    }


}

module.exports = new LoginController();