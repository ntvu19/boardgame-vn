const homeRouter = require('../routes/home.route')
const loginRouter = require('../routes/login.route')
const adminRouter = require('../routes/admin.route')
const userRouter = require('../routes/user.route')
const cartRouter = require('../routes/cart.route')
const orderRouter = require('../routes/order.route')
const productRouter = require('../routes/product.route')
const commentRouter = require('../routes/comment.route')


const route = (app) => {

    app.use('/admin', adminRouter)
    app.use('/login', loginRouter)
    app.use('/cart', cartRouter)
    app.use('/delivery', orderRouter)

    app.use('/payment', (req, res, next) => {
        res.render('payment', { layout: 'customer' })
    })

    app.use('/product', productRouter)
    app.use('/user', userRouter)
    app.use('/', homeRouter)

    // app.use('/user', require('./routes/user'))

}

module.exports = route