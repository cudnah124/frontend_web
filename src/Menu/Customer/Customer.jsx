import React, { useState } from 'react';
import './Customer.css';
import axios from 'axios';
function Customer({ onClose, onSubmit }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);  // Thêm state loading để quản lý trạng thái khi gửi thông tin

  const handleSubmit = async () => {
    const customerData = {
        ho: firstname,
        ten: lastname,
        sdt: phone
      };
  
    try {
      setLoading(true);  // Bật loading khi đang gửi thông tin
      const response = await axios.post('http://localhost:5000/api/payment',{
        firstname,
        lastname,
        phone
      });
  
      console.log("Thanh toán thành công:", response.data);
      alert("✅ Nhập thông tin khách hàng thành công!");
      onSubmit(customerData);  // Gửi thông tin khách hàng lên component cha nếu cần
      onClose();  // Đóng modal sau khi thanh toán thành công
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false);  // Tắt loading sau khi kết thúc
    }
  };

  return (
    <div className="customer-modal">
      <div className="customer-modal-content">
        <h2>Thông tin khách hàng</h2>
        <form>
          <div className="form-group">
            <label>Họ:</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Tên:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button 
            type="button" 
            className="submit-btn" 
            onClick={handleSubmit} 
            disabled={loading}  // Vô hiệu hóa nút khi đang gửi
          >
            {loading ? 'Đang thanh toán...' : 'Xác nhận'}
          </button>
          <button 
            type="button" 
            className="close-btn" 
            onClick={onClose}
          >
            Đóng
          </button>
        </form>
      </div>
    </div>
  );
}

export default Customer;
