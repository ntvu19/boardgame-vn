const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

class UserController {

    /**
     * @route [GET] /api/user/get-information
     * @desc Get user's information
     * @access private
     */
    getUserInformation(req, res, next) {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        UserModel.findById(decoded.userId)
            .then(user => {
                return res.status(200).json({
                    fullName: user.fullName,
                    email: user.email,
                    birthday: user.birthday,
                    phone: user.phone,
                    address: user.address,
                    avatar: user.avatar,
                    gender: user.gender,
                    active: user.active,
                    createAt: user.createAt
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            });
    }

    /**
     * @route [PUT] /api/user/edit-information
     * @desc Update user's information
     * @access private
     */
    editUserInformation(req, res, next) {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        UserModel.findByIdAndUpdate(decoded.userId, req.body)
            .then(() => {
                return res.status(200).json({
                    message: 'Update Successfully',
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            })
    }

}

module.exports = new UserController();