const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = (req, res) => {
    const { username, password } = req.body;

    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const user = results[0];

        if (!user || !bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        pool.query('SELECT nama_role FROM roles WHERE id_role = ?', [user.role_id], (err, roles) => {
            if (err) return res.status(500).json({ error: err.message });

            const token = jwt.sign(
                { id: user.id_user, username: user.username, role: roles[0].nama_role },
                'secret_key',
                { expiresIn: '1h' }
            );

            res.json({ token });
        });
    });
};