const jwt = require('jsonwebtoken');
const OrderModel = require('../models/order.model');
const UserModel = require('../models/user.model');
const ProductModel = require('../models/product.model');

class OrderController {

    /**
     * @route [POST] /api/order/create
     * @desc Create a new order
     * @access private
     */
    create(req, res, next) {
        // The _id of the product is stored in the user's cart
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const newOrder = new OrderModel(req.body);
        newOrder.userId = decodedToken.userId;
        newOrder.save()
            .then(() => {
                return res.status(200).json({ message: 'Create Successfully' });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [PUT] /api/order/update/:id
     * @desc Update the state or any data of an order
     * @access private
     */
    updateOrder(req, res, next) {
        const orderId = req.params.id;
        OrderModel.findOneAndUpdate({ _id: orderId }, req.body)
            .then(() => {
                return res.status(200).json({ message: 'Update Successfully' });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [DELETE] /api/order/remove/:id
     * @desc Remove an order
     * @access private
     */
    removeOrder(req, res, next) {
        OrderModel.findOneAndRemove({ _id: req.params.id })
            .then(() => {
                return res.status(200).json({ message: 'Delete Successfully' });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            })
    }

}

module.exports = new OrderController();