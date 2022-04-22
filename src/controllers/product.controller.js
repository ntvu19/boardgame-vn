const ProductModel = require('../models/product.model')

class ProductController {

    // [GET] /product
    index(req, res, next) {
        ProductModel.find({})
            .then(product => {
                res.render('product', {
                    layout: 'customer',
                    products: product.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // [GET] /product/:id
    details(req, res, next) {
        let productId = req.params.id
        ProductModel.findById(productId)
            .then(product => {
                res.render('detail', {
                    layout: 'customer',
                    product: product ? product.toObject() : product
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // [GET] /product/search
    searchProduct(req, res, next) {
        const searchQuery = req.query.search
        ProductModel.find({
                "name": {
                    $regex: searchQuery,
                    $options: "$i"
                }
            })
            .then(result => res.status(200).send(result))
            .catch(err => res.status(400).send({ message: err }))
    }

    /**
     * @route [GET] /api/product/view-related/:id
     * @desc View all related product
     * @access public
     */
    viewRelated(req, res, next) {

    }

}

module.exports = new ProductController()