import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const fetchData = async (currentPage) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/dashboard/orders?page=${currentPage}`);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Daftar Pesanan</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID Pesanan</th>
                            <th>Tanggal</th>
                            <th>Status</th>
                            <th>Total Harga</th>
                            <th>Nama Pelanggan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id_pesanan}>
                                <td>{row.id_pesanan}</td>
                                <td>{row.tanggal_pesanan}</td>
                                <td>{row.status}</td>
                                <td>{row.total_harga}</td>
                                <td>{row.nama_pelanggan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
            <span> Page {page} </span>
            <button onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
    );
}

export default DashboardTable;