const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tugasbesar'
});

async function runTest(query, iterations) {
    const conn = await connection;

    let totalTime = 0;

    for (let i = 0; i < iterations; i++) {
        const start = Date.now();
        await conn.query(query);
        const duration = Date.now() - start;
        totalTime += duration;
        console.log(`Query ke-${i + 1}: ${duration} ms`);
    }

    console.log(`\nRata-rata waktu: ${totalTime / iterations} ms`);
}

const query = `
    SELECT p.id_pesanan, p.tanggal_pesanan, p.status, p.total_harga, pl.nama AS nama_pelanggan
    FROM pesanan p
    JOIN pelanggan pl ON p.id_pelanggan = pl.id_pelanggan
    ORDER BY p.id_pesanan DESC
    LIMIT 10 OFFSET 0;
`;

runTest(query, 100); // 100 kali iterasi