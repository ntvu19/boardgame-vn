const ProductModel = require('../models/product.model');

class ProductController {

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

module.exports = new ProductController();