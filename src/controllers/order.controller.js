const OrderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const Cart = require('../models/cart.model')

class OrderController {


    /**
     * @route [GET] /order/view
     * @desc View all order list
     * @access private
     */
    viewAll(req, res, next) {
        OrderModel.find({})
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: 'Order Not Found',
                    })
                }
                return res.status(200).json({
                    data
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /**
     * @route [GET] /order/view-detail-order/:id
     * @desc View detail order
     * @access private
     */
    viewDetailOrder(req, res, next) {
        OrderModel.findById(req.params.id)
            .then(() => {
                return res.status(200).json({
                    message: 'Viewing Detail Order Successfully',
                })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({

                    message: err,
                })
            })
    }

    /** TS
     * @route [POST] /order/create-order/:id
     * @desc Create new order
     * @access private
     */
    createOrder(req, res, next) {
        const newOrder = new OrderModel(req.body)
        newOrder.save()
            .then(() => {
                return res.status(200).json({
                    message: 'Add Order successfully',
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /** TS
     * @route [Get] /order/add-to-cart/:id
     * @desc Add new product to cart
     * @access private
     */

    addCart(req, res, next){
        
        console.log("ok");
        const addProId = productModel.findById(req.body.id)[0];

        Cart.save(addProId);
        console.log(Cart.getCart());

        res.end('saved Su');
    }

}

module.exports = new OrderController()