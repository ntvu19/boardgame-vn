const homeRouter = require('../routes/home.route')
const loginRouter = require('../routes/login.route')
const adminRouter = require('../routes/admin.route')
const userRouter = require('../routes/user.route')
const orderRouter = require('../routes/order.route')
const productRouter = require('../routes/product.route')
const commentRouter = require('../routes/comment.route')

const route = (app) => {

    app.use('/admin', adminRouter)

    app.use('/login', (req, res, next) => {
        res.render('login')
    })

    app.use('/cart', (req, res, next) => {
        res.render('cart')
    })

    app.use('/category', (req, res, next) => {
        res.render('category')
    })

    app.use('/delivery', (req, res, next) => {
        res.render('delivery')
    })

    app.use('/payment', (req, res, next) => {
        res.render('payment')
    })

    app.use('/product', productRouter)
    app.use('/', homeRouter)
}

module.exports = route