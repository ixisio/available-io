'use strict';

var express = require('express'),
    pages = require('../ctrl/pages'),
    api = require('../ctrl/api'),
    config = require('./config'),
    router = express.Router();

// Page Routes
router.get(config.routes.index, pages.index);
router.get(config.routes.imprint, pages.imprint);

// API Routes
router.put('/api/user', api.registerUser);

router.all('/*', pages.error);

module.exports = router;
