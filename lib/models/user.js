'use strict';

var mongoose = require('mongoose');

var User = new mongoose.Schema({
    twitter: {
        id: {
            type: String,
            unique: true
        },
        token: String,
        username: String,
        displayName: String
    },
    availability: Object
});


User.path('twitter.id').validate(function(value, done) {
    this.model('User').count({ 'twitter.id': value }, function(err, count) {
        if (err) {
            return done(err);
        }

        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'User already exists');

module.exports = mongoose.model('User', User);
