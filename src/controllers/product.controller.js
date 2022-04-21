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

    /**
     * @route [GET] /api/product/view-related/:id
     * @desc View all related product
     * @access public
     */
    viewRelated(req, res, next) {

    }



    /**
     * @route [GET] /product/api/product-size
     * @desc View product descending by price
     * @access public
     */
    getProductSize(req, res, next) {
        ProductModel.count()
            .then(result => res.status(200).send({ productSize: result }))
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /product/sort
    productSortPagination(req, res, next) {
        const maxElement = 8;
        console.log('resquest: ', req.query, req.params)
        const offset = Number.parseInt(req.params.offset);
        const sortProduct = req.query.sortBy;//'None';//req.query.sortBy;//req.params.sortBy;//document.getElementById("sort").value;
        // const sortProduct = 'None'
        console.log('resquest2: ', offset, sortProduct)
        // const offset = 0;
        function product(){
            let products;
            if (sortProduct == ''){
                products = ProductModel.find({})
            } else if(sortProduct == 'descending'){
                products = ProductModel.find({}).sort({ price: "descending" })
            } else if(sortProduct == 'ascending'){
                products = ProductModel.find({}).sort({ price: "ascending" })
            }
            return products
        }


        product()
            .then(product => {
                const productSize = product.length
                let productListReturn = []
                
                for (let i = offset * maxElement; i < (offset + 1) * maxElement; i++) {
                    if (i == productSize) {
                        break
                    }
                    productListReturn.push(product[i])
                }
                console.log(productListReturn);
                res.status(200).send(productListReturn)
            })
            .catch(err => res.status(400).send({ message: err }))
    }
}

module.exports = new ProductController()