import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderManager.css';

const OrderManager = () => {
  const [orders, setOrders] = useState([
    {
      MaDonHang: 1,
      TrangThai: 'Pending',
      MaNV: 'NV0001',
      MaKH: 101,
      NgayGioTao: '2025-04-14T08:00:00',
    },
    {
      MaDonHang: 2,
      TrangThai: 'Preparing',
      MaNV: 'NV0002',
      MaKH: 102,
      NgayGioTao: '2025-04-14T09:30:00',
    },
    {
      MaDonHang: 3,
      TrangThai: 'Completed',
      MaNV: 'NV0003',
      MaKH: 103,
      NgayGioTao: '2025-04-14T10:00:00',
    },
    {
      MaDonHang: 4,
      TrangThai: 'Cancelled',
      MaNV: 'NV0004',
      MaKH: 104,
      NgayGioTao: '2025-04-14T11:00:00',
    },
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-manager-container">
      <h1>Quản lý Đơn hàng</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Trạng Thái</th>
            <th>Mã Nhân Viên</th>
            <th>Mã Khách Hàng</th>
            <th>Ngày Giờ Tạo</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.MaDonHang}>
              <td>{order.MaDonHang}</td>
              <td>{order.TrangThai}</td>
              <td>{order.MaNV || '—'}</td>
              <td>{order.MaKH}</td>
              <td>{new Date(order.NgayGioTao).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManager;
