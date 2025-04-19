import React, { useState, useEffect } from 'react';
import './RevenueStats.css';

const mockOrders = [
  { id: 1, completedAt: '2025-04-14 09:15', total: 80000 },
  { id: 2, completedAt: '2025-04-14 11:45', total: 150000 },
  { id: 3, completedAt: '2025-04-14 15:20', total: 90000 },
  { id: 4, completedAt: '2025-04-13 17:30', total: 120000 }, // hôm trước
];

function RevenueStats() {
  const [ordersToday, setOrdersToday] = useState([]);
  const [totalToday, setTotalToday] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-');
    const filtered = mockOrders.filter(order => order.completedAt.startsWith(today));
    setOrdersToday(filtered);

    const total = filtered.reduce((sum, o) => sum + o.total, 0);
    setTotalToday(total);
  }, []);

  return (
    <div className="revenue-container">
      <h1>📊 Thống kê doanh thu</h1>
      <div className="revenue-summary">
        <p>Tổng số đơn: <strong>{ordersToday.length} đơn</strong></p>
        Tổng tiền hôm nay: <strong>{totalToday.toLocaleString()}đ</strong>
      </div>

      <div className="revenue-list">
        {ordersToday.length === 0 ? (
          <p>Không có đơn nào hoàn thành hôm nay.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Thời gian hoàn thành</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {ordersToday.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.completedAt}</td>
                  <td>{order.total.toLocaleString()}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RevenueStats;
