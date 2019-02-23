const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userID: { type: String, required: true, unique: true, lowercase: true },
    departmentName: { type: String, required: true },
    password: { type: String, required: true},
    like: [String],
    index: {type: Number, required: true, unique: true}
});

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(12, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.authenticate = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

async function createUser(userID, departmentName, password) {
    try {
        var userNum = await User.count();
        var newUser = new User({
            userID: userID,
            departmentName: departmentName,
            password: password,
            like: [],
            index: userNum
        });
        await newUser.save();
        return await getAllUsers();
    } catch(err) {
        throw err;
    }
}

async function removeUser(user_id) {
    try {
        let removedUser = await User.findByIdAndRemove(user_id);
        await User.updateMany({index: {$gt: removedUser.index}}, {$inc: {index: -1}});
        return await getAllUsers();
    } catch(err) {
        throw err;
    }
}

async function modifyUser(user_id, userID, departmentName, password) {
    try {
        var update = {};
        if (!!userID)
            update.userID = userID;
        if (!!departmentName)
            update.departmentName = departmentName;
        if (!!password)
            update.password = password;
        await User.findByIdAndUpdate(user_id, update);
        return await getAllUsers();
    } catch(err) {
        throw err;
    }
}

async function getAllUsers() {
    try {
        return await User.find({}, null, {sort: {index: 1}});
    } catch(err) {
        throw err;
    }
}

module.exports = {User, getAllUsers, createUser, removeUser, modifyUser};