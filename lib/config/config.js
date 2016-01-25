'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    root: rootPath,
    port: process.env.PORT || 9000,
    lang: 'de',
    db: {
        url: process.env.MONGOLAB_URI || 'mongodb://localhost/available-io',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
    routes: {
        index: '/',
        imprint: '/imprint'
    },
    content: {
        title: 'Simple Availablility Announcement Tool for Freelancer'
    }
};
