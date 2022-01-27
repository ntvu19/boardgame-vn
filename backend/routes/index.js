const loginRouter = require('../routes/login.route');
const adminRouter = require('../routes/admin.route');
const userRouter = require('../routes/user.route');
const orderRouter = require('../routes/order.route');
const productRouter = require('../routes/product.route');
const commentRouter = require('../routes/comment.route');

function route(app) {
    app.use('/api', loginRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/user', userRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/product', productRouter);
    app.use('/api/comment', commentRouter);

}

module.exports = route;