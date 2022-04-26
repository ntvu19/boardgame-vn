const OrderModel = require('../models/order.model')
const ProductModel = require('../models/product.model')
const CartModel = require('../models/cart.model')
const jwt = require('jsonwebtoken')

class OrderController {

    // [POST] /delivery
    index(req, res, next) {
        res.render('delivery', { layout: 'customer' })
    }

    // [POST] /delivery/api/new-order
    createNewOrder(req, res, next) {
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY).userId
        OrderModel.findOne({ userId: userId })
            .then(order => {
                if (order && order.status === "Chờ thanh toán") {
                    return res.status(200).send({ message: 'Success' })
                } else {
                    CartModel.findOne({ userId: userId })
                        .then(cart => {
                            const orderData = {}
                            orderData.userId = userId
                            orderData.products = cart.products
                            orderData.name = req.body.name
                            orderData.phone = req.body.phone
                            orderData.address = req.body.address
                            const newOrder = new OrderModel(orderData)
                            newOrder.save()
                            return res.status(200).send({ message: 'Success' })
                        })
                }
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [PUT] /delivery/api/update-method
    updateMethod(req, res, next) {
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY).userId
        OrderModel.findOneAndUpdate({ userId: userId, status: "Chờ thanh toán" }, {
                deliveryMethod: req.body.deliveryMethod,
                paymentMethod: req.body.paymentMethod,
                status: req.body.status
            })
            .then(() => res.status(200).send({ message: 'Success' }))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /delivery/api/get-order
    getOrderList(req, res, next) {
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY).userId
        OrderModel.find({ userId: userId })
            .then(order => {
                res.status(200).send(order)
            }).catch(err => res.status(400).send({ message: err }))
    }

}

module.exports = new OrderController()