const pool = require('../config/db');

exports.getUserByUsername = (username, callback) => {
    pool.query('SELECT * FROM users WHERE username = ?', [username], callback);
};