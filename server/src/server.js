const koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const koaSession = require('koa-session');
const koaStatic = require('koa-static');
const koaMount = require('koa-mount');
const path = require('path');
const passport = require('koa-passport');

const loginRouter = require('./router/loginRouter');
const dataRouter = require('./router/dataRouter');
const adminRouter = require('./router/adminRouter');

const app = new koa();

mongoose.connect('mongodb://localhost/manual', {
    auth: {
        user: 'manualAdmin',
        password: 'nthu12345'
    }
});

// Parse
app.use(koaBody({multipart: true, urlencoded: true}));

// Session
app.keys = ['nthu-manual'];
app.use(koaSession(app));

// Passport init
require('./service/passport');
app.use(passport.initialize());
app.use(passport.session());

// login page & login router
app.use(koaMount('/login', koaStatic(path.resolve(__dirname, '../dist/login'))));
app.use(loginRouter.routes());

// manual page & data router
app.use(koaMount('/entry', koaStatic(path.resolve(__dirname, '../dist/entry'))));
app.use(koaMount('/manual', koaStatic(path.resolve(__dirname, '../dist/manual'))));
app.use(koaMount('/workshop', koaStatic(path.resolve(__dirname, '../dist/workshop'))));
app.use(dataRouter.routes());

// admin page & admin operation
app.use(adminRouter.routes());

const port = 80;
app.listen(port, () => {
    console.log(`Server is up and is running on port ${port}`);
});