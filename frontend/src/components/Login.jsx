import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            });

            // Simpan token di localStorage
            localStorage.setItem('token', response.data.token);

            alert('Login berhasil!');
        } catch (error) {
            console.error("Login gagal:", error.response?.data || error.message);
            alert('Login gagal');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;