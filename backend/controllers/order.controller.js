const OrderModel = require('../models/order.model');

class OrderController {


    /**
     * @route [GET] /api/order/view
     * @desc View all order list
     * @access private
     */
    viewAll(req, res, next) {
        OrderModel.find({})
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: 'Order Not Found',
                    });
                }
                return res.status(200).json({
                    data
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                });
            });
    }

    /**
     * @route [GET] /api/order/view-detail-order/:id
     * @desc View detail order
     * @access private
     */
    viewDetailOrder(req, res, next){
        console.log(req.params.id)
        OrderModel.findById(req.params.id)
            .then(() => {               
                return res.status(200).json({
                    message: 'Viewing Detail Order Successfully',
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({
                    
                    message: err,
                });
            })
    }



}

module.exports = new OrderController();