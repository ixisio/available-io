'use strict';

var mongoose = require('mongoose');
var User;

User = new mongoose.Schema({
    email: String,
    name: {
        type: String,
        unique: true
    }
});

User.path('name').validate(function(value, done) {
    this.model('User').count({ name: value }, function(err, count) {
        if (err) {
            return done(err);
        }

        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Username already exists');

module.exports = mongoose.model('User', User);
