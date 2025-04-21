import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeManager.css';
import EditEmployeeModal from './Components/EditEmployeeModal';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([
    {
        "MaNV": "NV0001",
        "Ho": "Nguyen",
        "Ten": "An",
        "DiaChi": {
          "SoNha": "12",
          "Duong": "Nguyen Trai",
          "Quan": "1",
          "ThanhPho": "HCM"
        },
        "SDTs": ["0912345678"],
        "Emails": ["an.nguyen@example.com"],
        "CaLams": [
          { "MaCa": "CA01", "NgayLam": "2025-04-12", "GioLam": "08:00", "GioTan": "12:00" }
        ]
      },
  ]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('https://backend-web-q7f1.onrender.com/api/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error('Lỗi lấy nhân viên:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    alert('Add employee');
  }

  const handleEdit = (MaNV) => {
    const nv = employees.find(emp => emp.MaNV === MaNV);
    setEditingEmployee(nv);
  };

  const handleSave = async (updated) => {
    try {
      await axios.put(`http://localhost:3001/api/employees/${updated.MaNV}`, updated);
      setEmployees((prev) =>
        prev.map((emp) => (emp.MaNV === updated.MaNV ? updated : emp))
      );
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
    }
  };

  return (
    <div className="employee-table-container">
      <h1>Quản lý nhân viên</h1>
      <button className="employee-add-button" onClick={handleAdd}>+ Thêm nhân viên</button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Ca làm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((nv) => (
            <tr key={nv.MaNV}>
              <td>{nv.MaNV}</td>
              <td>{nv.Ho}</td>
              <td>{nv.Ten}</td>
              <td>{nv.DiaChi ? `${nv.DiaChi.SoNha}, ${nv.DiaChi.Duong}, ${nv.DiaChi.Quan}, ${nv.DiaChi.ThanhPho}` : '—'}</td>
              <td>{nv.SDTs?.join(', ') || '—'}</td>
              <td>{nv.Emails?.join(', ') || '—'}</td>
              <td>
                {nv.CaLams?.map(
                  (ca) => `${ca.MaCa} (${ca.NgayLam} ${ca.GioLam}→${ca.GioTan})`
                ).join('; ') || '—'}
              </td>
              <td className="employee-action-buttons">
                <button className = "employee-edit" onClick={() => handleEdit(nv.MaNV)}>Chỉnh sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmployeeManager;
