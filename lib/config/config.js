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
        imprint: '/imprint',
        dashboard: '/dashboard',

    },
    content: {
        title: 'Simple Availablility Announcement Tool for Freelancer'
    },
    auth: {
        sessionSecret: 'J9tLsrAmXLCvdibcmaBpGW8FrzwWUyLtMWaRcAetgi',
        twitter: {
            key: '9vk542RSeKia1374vv8xdLkFu',
            secret: 'MVw57GhQlnimno74ACrBpoFjv7TvjoF2KJ2vEg7oPWNfQcB4eC',
            callback: process.env.NODE_ENV === 'production' ? 'http://available-io.herokuapp.com/auth/twitter/callback' : 'http://127.0.0.1:8080/auth/twitter/callback'
        },
    }
};
