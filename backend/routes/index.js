const userRouter = require('./user.route');
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/category', categoryRouter);
}

module.exports = route;