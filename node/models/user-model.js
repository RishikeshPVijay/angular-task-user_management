const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    address: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    registered: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    if (user.password) {
        bcrypt.hash(user.password, 12, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

var User = mongoose.model('users', userSchema);
module.exports = User;