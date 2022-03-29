const ProductModel = require('../models/product.model')

class ProductController {

    // [GET] /product
    index(req, res, next) {
        ProductModel.find({})
            .then(product => {
                res.render('product', { products: product.map(mongoose => mongoose.toObject()) })
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
                    product: product ? product.toObject() : product
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    /**
     * @route [GET] /api/product/view-all
     * @desc View all of product by type
     * @access public
     */
    getListProduct(req, res, next) {
        ProductModel.find({})
            .then(product => {
                return res.status(200).json({
                    product,
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err,
                })
            })
    }

    /**
     * @route [GET] /api/product/view-detail/:id
     * @desc View detail of a product
     * @access public
     */
    viewDetail(req, res, next) {

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