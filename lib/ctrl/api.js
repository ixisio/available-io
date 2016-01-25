var mongoose = require('mongoose'),
    config = require('../config/config'),
    User = require('../models/User');

exports.registerUser = function (req, res) {
    if (!req.body.user) {
        res.status(500)
            .json({
                error: true,
                message: 'Unknown Error. Please try again!'
            });

        return console.log('user is not defined as PUT Parameter');
    }

    // Create Dealer
    var user = new User(req.body.user);

    // Save Dealer to database
    user.save(function (err) {

        if (err) {
            if (err.errors.name.message) {
                res.status(500)
                    .json({
                        error: true,
                        message: 'The Username ' +  err.errors.name.value + ' already exists in our database. Choose another!'
                    });
            } else {
                res.status(500)
                    .json({
                        error: true,
                        message: 'Unknown Error.'
                    });
            }

            console.log(err);
        } else {
            res.status(200)
               .json({
                    error: false,
                    message: 'Howdy, your registration was successful!'
                });
        }
    });
};
