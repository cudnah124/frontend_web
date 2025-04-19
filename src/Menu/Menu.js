import React, { useState, useEffect } from 'react';
import Customer from './Customer/Customer';
import './Menu.css';





// Hàm gọi API (giả sử API trả về dữ liệu giống menuItems)
const fetchMenuItems = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/menu');  // Thay thế bằng URL thật của API
    const data = await response.json();
    return data;  // Dữ liệu trả về phải có cấu trúc giống menuItems
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};

function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [menuItems, setMenuItems] = useState([]); // Dữ liệu menuItems từ API

  useEffect(() => {
    const loadMenu = async () => {
      const fetchedMenu = await fetchMenuItems();
      setMenuItems(fetchedMenu);  // Cập nhật dữ liệu menuItems
    };
    loadMenu();
  }, []);  // Chạy 1 lần khi component mount
  
  const openModal = () => {
    setShowModal(true);
  };
  
  // Hàm đóng modal
  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleCustomerSubmit = (customerData) => {
    console.log("Thông tin khách hàng:", customerData);
    // Bạn có thể gọi API để thanh toán tại đây hoặc xử lý dữ liệu
  };

  // Thêm món vào giỏ
  const addToCart = (drink) => {
  const key = `${drink.MaMon}_${drink.KichThuoc}`;  // Tạo key duy nhất
  setCart((prev) => {
    const qty = prev[key]?.qty || 0;
    return {
      ...prev,
      [key]: {
        ...drink,
        qty: qty + 1,
      }
    };
  });
};

  // Xóa món khỏi giỏ
  const removeFromCart = (drink) => {
    const key = `${drink.MaMon}_${drink.KichThuoc}`;
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[key];
      return newCart;
    });
  };

  // Cập nhật số lượng món trong giỏ
  const updateQuantity = (drink, qty) => {
    const key = `${drink.MaMon}_${drink.KichThuoc}`;
    setCart((prev) => {
      if (qty <= 0) {
        removeFromCart(key);
        return prev;
      }
      return {
        ...prev,
        [key]: {
          ...prev[key],
          qty: qty,
        },
      };
    });
  };

  // Tổng giá trị giỏ hàng
  const total = Object.values(cart).reduce((sum, item) => sum + item.qty * item.Gia, 0);
  console.log('MenuItem', menuItems);
  // Lọc món theo danh mục
  const filteredMenu = menuItems
  .filter(item => activeCategory === 'Tất cả' || item.Loai === activeCategory)
  .filter(item => item.TenMon?.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => a.MaMon.localeCompare(b.MaMon));
  console.log('filteredMenu', filteredMenu);
  return (
    <div className='container'>
      <h1 className='menu-brand'>Menu Nước Uống</h1>

      {/* Tìm kiếm món */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm món..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Các danh mục */}
      <div className="category-buttons">
        {['Tất cả','NuocUong', 'Topping'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hiển thị các món trong danh mục đã chọn */}
      <div className="menu">
        {filteredMenu.map((drink) => (
          <div key={drink.id} className="drink-card">
            <img src={drink.img} alt={drink.name} />
            <h3>{drink.TenMon} {drink.KichThuoc ? `(${drink.KichThuoc})` : ''}</h3>
            <p>{drink.Gia.toLocaleString()}đ</p>
            <button className="add-button" onClick={() => addToCart(drink)}>
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {/* Thanh giỏ hàng cố định */}
      <div className="fixed-cart">
        <h2>🛒 Giỏ hàng</h2>
        {Object.values(cart).length === 0 ? (
          <p>Chưa có gì trong giỏ</p>
        ) : (
          <ul>
            {Object.values(cart).map((item) => (
              <li key={item.MaMon} className="cart-item">
                <div>
                  {item.TenMon} {item.KichThuoc ? `(${item.KichThuoc})` : ''} x{' '}
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item, parseInt(e.target.value, 10) || 1)
                    }
                  />
                </div>
                <div>
                  = {(item.qty * item.Gia).toLocaleString()}đ
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item)}>Xóa
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Tổng: {total.toLocaleString()}đ</h3>
        <button className="checkout-btn" onClick={openModal}>Thanh toán</button>
      </div>
      {showModal && (
        <Customer onClose={closeModal} onSubmit={handleCustomerSubmit} />
      )}
    </div>
  );
}

export default Menu;
