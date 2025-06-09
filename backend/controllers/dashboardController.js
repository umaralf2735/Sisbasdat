const pool = require('../config/db');

// Fungsi dengan pagination
exports.getOrdersWithPagination = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const query = `
        SELECT p.id_pesanan, p.tanggal_pesanan, p.status, p.total_harga, pl.nama AS nama_pelanggan
        FROM pesanan p
        JOIN pelanggan pl ON p.id_pelanggan = pl.id_pelanggan
        ORDER BY p.id_pesanan DESC
        LIMIT ? OFFSET ?
    `;

    pool.query(query, [limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Fungsi TANPA pagination (hanya contoh untuk pengujian performa)
exports.getAllOrdersWithoutPagination = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 100; // Bisa disesuaikan
    const offset = (page - 1) * limit;

    const query = `
        SELECT p.id_pesanan, p.tanggal_pesanan, p.status, p.total_harga, pl.nama AS nama_pelanggan
        FROM pesanan p
        JOIN pelanggan pl ON p.id_pelanggan = pl.id_pelanggan
        ORDER BY p.id_pesanan DESC
        LIMIT ? OFFSET ?
    `;

    pool.query(query, [limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};