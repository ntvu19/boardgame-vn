const userRouter = require('./user.route');

function route(app) {
    app.use('/api/user', userRouter);
}

module.exports = route;