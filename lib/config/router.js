'use strict';

var express = require('express'),
    passport = require('passport'),
    pages = require('../ctrl/pages'),
    api = require('../ctrl/api'),
    config = require('./config'),
    router = express.Router();

// Routing Helper
// route middleware to make sure a user is logged in
function _isLoggedIn (req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect(config.routes.index);
}

function _redirectDashboard (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

     res.redirect(config.routes.dashboard);
}

// Page Routes
router.get(config.routes.index, _redirectDashboard, pages.index);
router.get(config.routes.imprint, pages.imprint);
router.get(config.routes.dashboard, _isLoggedIn, pages.dashboard);

// Auth Routes
// @todo Move to Auth Controller
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/dashboard',
        failureRedirect : '/'
    })
);
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.all('/*', pages.error);

module.exports = router;
