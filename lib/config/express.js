'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    ectRenderer = require('ect')({
        watch : true,
        root : './',
        ext : '.html'
    });

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
    require('./passport')(passport);

    // Authentication
    if (config.env === 'sandbox') {
        app.use('*', _basicAuth('andy', 'andy'));
    }

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // Auth
    app.use(session({
        secret: config.auth.sessionSecret,
        resave: true,
        saveUninitialized: true
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    // Static Files
    app.use(express.static('public'));

    // Templating
    app.set('views', './');
    app.set('view engine', 'html');
    app.engine('html', ectRenderer.render);
};
