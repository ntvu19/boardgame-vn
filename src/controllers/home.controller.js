const ProductModel = require('../models/product.model')

class HomeController {

    // [GET] /
    index(req, res, next) {
        ProductModel.find({})
            .then(product => {
                res.render('home', {
                    layout: 'customer',
                    products: product.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = new HomeController()