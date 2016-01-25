'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    ectRenderer = require('ect')({
        watch : true,
        root : './',
        ext : '.html'
    }),
    i18n = require('i18n');

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/path', _basicAuth('username', 'password'));
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
var _basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }

    next();
  };
};

module.exports = function(app, config) {

    // Authentication
    if (config.env === 'sandbox') {
        app.use('*', _basicAuth('andy', 'andy'));
    }

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Static Files
    app.use(express.static('public'));

    // Templating
    app.set('views', './');
    app.set('view engine', 'html');
    app.engine('html', ectRenderer.render);

    // Init Translation
    // i18n.configure({
    //     locales:['de', 'fr'],
    //     defaultLocale: config.lang,
    //     directory: './i18n'
    // });

    // Translation helper for ECT TemplateEngine
    // app.use(function (req, res, next) {
    //     res.locals.__ = function (string) {
    //         return i18n.__.apply(req, arguments);
    //     };

    //     res.__ = function (string) {
    //         return i18n.__.apply(req, arguments);
    //     };

    //     next();
    // });
};
