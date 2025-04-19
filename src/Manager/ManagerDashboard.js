import React from 'react';
import { useNavigate } from 'react-router-dom';
function ManagerDashboard() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Trang Quản lý (Manager)</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <button style={buttonStyle} onClick={() => navigate('/manager/employees')}>Quản lý Nhân viên</button>
        <button style={buttonStyle} onClick={() => navigate('/orders')}>Quản lý Đơn hàng</button>
        <button style={buttonStyle} onClick={() => navigate('/manager/revenue')}>Thống kê & Doanh thu</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default ManagerDashboard;
