const CategoryModel = require('../models/category.model');
const ProductModel = require('../models/product.model');

class CategoryController {

    /**
     * @route [GET] /api/category/view
     * @desc View all category
     * @access public
     */
    view(req, res, next) {
        CategoryModel.find({})
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [GET] /api/category/view/:id
     * @desc View the detail of a category
     * @access public
     */
    viewDetails(req, res, next) {
        const categoryId = req.params.id;
        CategoryModel.findById({ _id: categoryId })
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [POST] /api/category/create
     * @desc Create a new category
     * @access private
     */
    create(req, res, next) {
        const category = new CategoryModel(req.body);
        category.save()
            .then(() => {
                return res.status(200).json({ message: 'Successfully' });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            })
    }

    /**
     * @route [PUT] /api/category/add-product/:id?productId=${_id}
     * @desc Add a product to a category
     * @access private
     */
    addProduct(req, res, next) {
        CategoryModel.findById({ _id: req.params.id })
            .then(category => {
                if (!category) {
                    return res.status(404).json({ message: 'Category was not found' });
                }
                const productId = req.query.productId;
                if (!productId) {
                    return res.status(404).json({ message: 'Product was not found' });
                }
                ProductModel.findById({ _id: productId })
                    .then(product => {
                        if (!product) {
                            return res.status(404).json({ message: 'Product was not found' });
                        }
                        category.product.push(productId);
                        CategoryModel.updateOne({ _id: req.params.id }, category)
                            .then(() => {
                                return res.status(200).json({ message: 'Successfully' });
                            })
                            .catch(err => {
                                return res.status(500).json({ message: err });
                            });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            })
            .catch(err => {
                return res.status(404).json({ message: err });
            });
    }

    /**
     * @route [PUT] /api/category/edit/:id
     * @desc Edit a category
     * @access private
     */
    editCategory(req, res, next) {
        const categoryId = req.params.id;
        CategoryModel.findById({ _id: categoryId })
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'Category was not found' });
                }
                CategoryModel.updateOne({ _id: categoryId }, req.body)
                    .then(() => {
                        return res.status(200).json({ message: 'Successfully' });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: err });
                    });
            })
            .catch(err => {
                return res.status(500).json({ message: err });
            });
    }

    /**
     * @route [DELETE] /api/category/delete/:id
     * @desc Remove a category
     * @access private
     */
    removeCategory(req, res, next) {
        CategoryModel.findOneAndRemove({ _id: req.params.id })
            .then(() => {
                return res.status(200).json({ message: 'Successfully' });
            })
            .catch(err => {
                return res.status(404).json({ message: 'Successfully' });
            });
    }

}

module.exports = new CategoryController();