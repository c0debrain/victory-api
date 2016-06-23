var path = require('path');

var settings = {
    path:       path.normalize(path.join(__dirname, '..')),
    port:       process.env.NODE_PORT || 3000,
    database:   'onelink_dev',
    user:       'onelink_dev',
    password:   'onelink_dev',
    connection: {
        host:       '10.10.78.75',
        dialect:    'mariadb'
    },
    keys: [
        'local'
    ],
    cache: {
        debug: true
    }
};

module.exports = settings;
