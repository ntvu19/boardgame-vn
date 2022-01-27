const OrderModel = require('../models/order.model');

class OrderController {

    // viewAll(req, res, next) {
    //     OrderModel.find({})
    //         .then(data => {
    //             if (!data) {
    //                 return res.status(404).json({
    //                     message: 'Order Not Found',
    //                 });
    //             }
    //             return res.status(200).json({
    //                 data
    //             });
    //         })
    //         .catch(err => {
    //             return res.status(500).json({
    //                 message: err,
    //             });
    //         });
    // }

}

module.exports = new OrderController();