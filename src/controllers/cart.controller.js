const CartModel = require('../models/cart.model')
const UserModel = require('../models/user.model')
const ProductModel = require('../models/product.model')
const jwt = require('jsonwebtoken')

class CartController {
    // [GET] /cart
    index(req, res, next) {
        res.render('cart', { layout: 'customer' })
    }

    // [POST] /cart/add
    addToCart(req, res, next) {
        const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)

        CartModel.findOne({ userId: decodedToken.userId })
            .then(cart => {
                if (!cart) {
                    const cartData = {
                        userId: decodedToken.userId,
                        products: [{
                            productId: req.body.productId,
                            quantity: 1
                        }]
                    }
                    const newCart = new CartModel(cartData)
                    newCart.save()
                        .then(() => res.status(200).send({ message: 'Success' }))
                        .catch(err => res.status(400).send({ message: err }))
                } else {
                    const productArr = cart.products
                    const addedProductId = req.body.productId
                    var foundProduct = false
                    let i = 0

                    // Find product
                    for (i = 0; i < productArr.length; i++) {
                        if (productArr[i].productId.toString() == addedProductId) {
                            foundProduct = true
                            break
                        }
                    }

                    // Update product
                    if (!foundProduct) {
                        cart.products = [...cart.products, { productId: addedProductId, quantity: 1 }]
                    } else {
                        cart.products[i].quantity += 1
                    }
                    cart.save()
                }
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [GET] /cart/api/cart-data
    getCartData(req, res, next) {
        if (req.cookies.token === undefined) {
            return res.status(400).send({ message: 'Invalidation' })
        }

        const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        CartModel.findOne({ userId: decodedToken.userId })
            .then(cart => {
                const productArr = cart.products
                var products = []

                for (let i = 0; i < productArr.length; i++) {
                    ProductModel.findById(productArr[i].productId)
                        .then(product => {
                            const productEl = {}
                            productEl.productId = product._id
                            productEl.photo = product.photo[0]
                            productEl.name = product.name
                            productEl.price = product.price
                            productEl.quantity = productArr[i].quantity
                            products.push(productEl)
                        })
                }
                setTimeout(() => res.status(200).send({ products }), 500)
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [PUT] /cart/api/cart-edit
    editCartData(req, res, next) {
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY).userId
        CartModel.findOne({ userId: userId })
            .then(cart => {
                const productArr = cart.products
                for (let i = 0; i < productArr.length; i++) {
                    if (productArr[i].productId == req.body.productId) {
                        cart.products[i].quantity = req.body.quantity
                        break
                    }
                }
                cart.save()
                return res.status(200).send({ message: 'Success' })
            })
            .catch(err => res.status(400).send({ message: err }))
    }

    // [DELETE] /cart/api/remove-product
    removeProductFromCart(req, res, next) {
        // console.log(req.body.productId)
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY).userId
        CartModel.findOne({ userId: userId })
            .then(cart => {
                const productArr = cart.products
                for (let i = 0; i < productArr.length; i++) {
                    if (productArr[i].productId == req.body.productId) {
                        cart.products.splice(i, 1)
                    }
                }
                cart.save()
                return res.status(200).send({ message: 'Success' })
            })
            .catch(err => res.status(400).send({ message: err }))
    }

}

module.exports = new CartController()