var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    config = require('./lib/config/config'),
    router = require('./lib/config/router');

// database connection
mongoose.connect(config.db.url, config.db.options);

// Express settings
require('./lib/config/express')(app, config);

// Basic Routing
app.use('/', router);

app.listen(config.port, function () {
    console.log('App started on port %s', config.port);
});
