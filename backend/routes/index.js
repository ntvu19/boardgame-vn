const userRouter = require('./user.route');
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');
const orderRouter = require('./order.route');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/order', orderRouter);
}

module.exports = route;