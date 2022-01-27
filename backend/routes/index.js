const loginRouter = require('../routes/login.route');
const adminRouter = require('../routes/admin.route');
const userRouter = require('../routes/user.route');

function route(app) {
    app.use('/api', loginRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/user', userRouter);



}

module.exports = route;