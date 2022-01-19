const userRouter = require('./user.route');
// const authRouter = require('./auth.route')

function route(app) {
    app.use('/api/user', userRouter);
    // app.use('/api/auth', authRouter);
}

module.exports = route;