const passport = require('koa-passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../model/user').User;
const recordLoginInfo = require('../model/record').recordLoginInfo;

passport.use(new localStrategy((username, password, done) => {
    User.findOne({ userID: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);

        user.authenticate(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
            recordLoginInfo(user);
            return done(null, user);
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, {
        userID: user.userID,
        departmentName: user.departmentName,
        like: user.like
    });
});

passport.deserializeUser((user, done) => {
    User.findOne({userID: user.userID}, done);
});