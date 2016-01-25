'use strict';

// Module dependencies
var config = require('../config/config'),
    _ = require('underscore');

exports.index = function (req, res) {
    var data = _.extend({
        title: config.content.title
    }, config);

    res.render('lib/views/pages/index.html', data);
};

exports.imprint = function (req, res) {
    var data = _.extend({
        title: 'Imprint - ' + config.content.title
    }, config);

    res.render('lib/views/pages/imprint.html', data);
};

// 404 Error Pages
exports.error = function (req, res, next) {
    var errorMessage = 'Ups, this page is not available';
        data = _.extend({
            title: 'Ups, this page is not available',
            errorMessage: errorMessage
        }, config),
        err = new Error(errorMessage);

    console.log(err);

    res.status(404)
       .render('lib/views/pages/error.html', data);
};
