// components/EditEmployeeModal.jsx
import React, { useState, useEffect } from 'react';
import './EditEmployeeModal.css';

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...employee });

  useEffect(() => {
    setFormData({ ...employee });
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    if (key) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose(); // Đóng modal
  };

  if (!employee) return null;

  return (
    <div className="employee-modal">
      <div className="employee-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Chỉnh sửa nhân viên {employee.MaNV}</h2>
        
        <input name="Ho" value={formData.Ho} onChange={handleChange} placeholder="Họ" />
        <input name="Ten" value={formData.Ten} onChange={handleChange} placeholder="Tên" />

        <h4>Địa chỉ:</h4>
        <input name="DiaChi.SoNha" value={formData.DiaChi?.SoNha || ''} onChange={handleChange} placeholder="Số nhà" />
        <input name="DiaChi.Duong" value={formData.DiaChi?.Duong || ''} onChange={handleChange} placeholder="Đường" />
        <input name="DiaChi.Quan" value={formData.DiaChi?.Quan || ''} onChange={handleChange} placeholder="Quận" />
        <input name="DiaChi.ThanhPho" value={formData.DiaChi?.ThanhPho || ''} onChange={handleChange} placeholder="Thành phố" />

        <h4>SĐT:</h4>
        <input name="SDTs" value={formData.SDTs?.[0] || ''} onChange={(e) => setFormData({ ...formData, SDTs: [e.target.value] })} placeholder="SĐT" />

        <h4>Email:</h4>
        <input name="Emails" value={formData.Emails?.[0] || ''} onChange={(e) => setFormData({ ...formData, Emails: [e.target.value] })} placeholder="Email" />

        <button onClick={handleSave}>Lưu</button>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
