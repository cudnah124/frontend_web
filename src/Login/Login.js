import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = (role) => async (e) => {
    e.preventDefault();
  try {
    const response = await axios.post('https://backend-web-q7f1.onrender.com/api/auth/login', {
      username,
      password,
      role
    });
    if (response.data.success) {
        alert(response.data.message);
        navigate(role === 'manager' ? '/manager' : '/menu');
      }
    } catch (err) {
        console.error('Error details:', err.response);
      alert(err.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };
//   const handleLogin = (role) => (e) => {
//     e.preventDefault();

//     // Giả lập kiểm tra theo role
//     if (role === 'manager' && username === 'manager' && password === 'admin123') {
//       alert('Đăng nhập thành công với quyền Quản lý!');
//       navigate('/manager'); // hoặc navigate('/manager-dashboard')
//     } else if (role === 'staff' && username === 'nha' && password === '123') {
//       alert('Đăng nhập thành công với quyền Nhân viên!');
//       navigate('/menu'); // hoặc navigate('/staff-dashboard')
//     } else {
//       alert('Sai tên đăng nhập hoặc mật khẩu!');
//     }
//   };

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
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className = "login" onClick={handleLogin('manager')}>Đăng nhập Quản lý</button>
          <button className = "login" onClick={handleLogin('staff')}>Đăng nhập Nhân viên</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
