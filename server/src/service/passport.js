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
        userName: user.userName,
        departmentID: user.departmentID,
        departmentName: user.departmentName,
        like: [user.like_1, user.like_2, user.like_3]
    });
});

passport.deserializeUser((user, done) => {
    User.findOne({userID: user.userID}, done);
});