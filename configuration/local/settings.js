var path = require('path');

var settings = {
    path:   path.normalize(path.join(__dirname, '..')),
    port:   process.env.NODE_PORT || 3000,
    database:   {
        type:       process.env.DATABASE_TYPE || 'postgres',
        host:       process.env.DATABASE_HOST || 'localhost',
        port:       process.env.DATABASE_PORT || 5432,
        name:       process.env.POSTGRES_DB || 'development',
        user:       process.env.POSTGRES_USER || 'admin',
        pass:       process.env.POSTGRES_PASSWORD
    },
    keys: [
        'development'
    ],
    cache: {
        debug: true
    }
};

console.log('Development settings loaded.');

module.exports = settings;
