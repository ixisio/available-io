var mongoose = require('mongoose'),
    config = require('../config/config'),
    User = require('../models/User');

var _throwUnknownError = function (res) {
    return res.status(500)
        .json({
            error: true,
            message: 'Unknown Error. Please try again!'
        });
}

exports.widget = function (req, res) {
    if (!req.query.user) {
        _throwUnknownError(res);

        return console.log('User is not defined as GET Parameter');
    }

    // Find User
    User
        .find({
            'twitter.username': req.query.user
        })
        .exec(function (err, userDataList) {
            var userData;

            if (err || !userDataList.length) {
                _throwUnknownError(res);

                return console.log(err);
            }

            userData = userDataList[0];

            console.log(JSON.stringify(userData.availability));

            res.setHeader('Content-Type', 'application/javascript')
            res.render('lib/views/blocks/_widget.html', {
                'userData': JSON.stringify(userData.availability)
            });
        });
}

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
