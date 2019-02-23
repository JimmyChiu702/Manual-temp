const passport = require('koa-passport');

const koaRouter = require('koa-router');
const router = new koaRouter();

const loginOption = {
    successRedirect: '/manual',
    failureRedirect: '/login'
};
const requireLogin = passport.authenticate('local', loginOption);

router.post('/login', requireLogin);

router.get('/logout', (ctx, next) => {
    ctx.logout();
    ctx.redirect('/login'); 
});

router.all('/*', (ctx, next) => {
    if (ctx.isAuthenticated()) {
        return next();
    } else {
        ctx.redirect('/login');
    }
});

module.exports = router;