import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Tránh click liên tục
  const navigate = useNavigate();

  const handleLogin = (role) => async (e) => {
    e.preventDefault();

    // Chặn khi đang loading
    if (loading) return;

    if (!username.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.post(
        'https://backend-web-q7f1.onrender.com/api/auth/login',
        {
          username: username.trim(),
          password: password.trim(),
          role
        },
        {
          timeout: 200000 // tránh request bị treo
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        navigate(role === 'manager' ? '/manager' : '/menu');
      }
    } catch (err) {
      console.error('Chi tiết lỗi:', err?.response || err);
      alert(err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Đăng nhập</h1>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>Tên đăng nhập:</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Mật khẩu:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="login"
            onClick={handleLogin('manager')}
            disabled={loading}
          >
            Đăng nhập Quản lý
          </button>
          <button
            type="button"
            className="login"
            onClick={handleLogin('staff')}
            disabled={loading}
          >
            Đăng nhập Nhân viên
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
