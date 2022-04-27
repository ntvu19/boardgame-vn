const ProductModel = require('../models/product.model')
const { pagination } = require('../configs/pagination')

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
                ProductModel.find({
                    categoryId: product.categoryId
                }).limit(5)
                    .then(result => {
                        res.render('detail', {
                            layout: 'customer',
                            relatedProducts: result.map(mongoose => mongoose.toObject()),
                            product: product ? product.toObject() : product
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // [GET] /product/search
    searchProduct(req, res, next) {
        const searchQuery = req.query.keyword || req.query.search
        // console.log("query", req.query);
        // console.log("body", req.body);

        const page = Number(req.params.page) || 1;

        const ItemPerPage = 8;
        ProductModel.find({
            name: { $regex: searchQuery, $options: "$i" }
        })
            .skip((ItemPerPage * page) - ItemPerPage)
            .limit(ItemPerPage)
            .then(product => {

                return product;
            })
            .then((product) => {
                ProductModel.find({
                    name: {
                        $regex: searchQuery,
                        $options: "$i"
                    }
                })
                    .then(t2 => {
                        const NumberOfUser = t2.length;

                        const pageCount = Math.ceil(NumberOfUser / ItemPerPage)
                        console.log(pageCount);
                        if (pageCount == 1) {
                            res.render('partials/customer/searchProductResult', {
                                layout: 'customer',
                                Products: product.map(mongoose => mongoose.toObject())
                            })
                        }
                        else {
                            const pageArray = pagination(page, pageCount)
                            res.render('partials/customer/searchProductResult', {
                                layout: 'customer',
                                pageArray,
                                keyword: searchQuery,
                                Products: product.map(mongoose => mongoose.toObject())
                            })
                        }

                    })

            })
            .catch(err => res.status(400).send({ message: err }))
    }

    /**
     * @route [GET] /api/product/view-related/:id
     * @desc View all related product
     * @access public
     */
    viewRelated(req, res, next) {
        console.log("hea2r");
        ProductModel.findById(req.params.id)
            .then(product => {
                console.log(product.categoryId);

            })
    }


    getTopProduct(req, res, next) {
        const p = ProductModel.find().sort({ sold: "descending" }).limit(5)

        ProductModel.find().sort({ sold: "descending" }).limit(5)
            .then(product => {
                res.render('/', {
                    layout: 'customer',
                    topProducts: product.map(mongoose => mongoose.toObject())
                })
            })
            .catch(err => res.status(400).send({ message: err }))
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

        const offset = Number.parseInt(req.params.offset);
        const sortProduct = req.query.sortBy;

        function product() {
            let products;
            if (sortProduct == '') {
                products = ProductModel.find({})
            } else if (sortProduct == 'descending') {
                products = ProductModel.find({}).sort({ price: "descending" })
            } else if (sortProduct == 'ascending') {
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
                res.status(200).send(productListReturn)
            })
            .catch(err => res.status(400).send({ message: err }))
    }


}

module.exports = new ProductController()