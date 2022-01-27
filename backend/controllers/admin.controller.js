const AdminModel = require('../models/admin.model');
const ProductModel = require('../models/product.model');
const OrderModel = require('../models/order.model');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

class AdminController {

    /**
     * @route [GET] /api/admin/view-all-user
     * @desc View all user information
     * @access private
     */
    viewAllUser(req, res, next) {
        UserModel.find({})
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json({
                    user,
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            });
    }

}

module.exports = new AdminController();