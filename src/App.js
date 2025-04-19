import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Menu from './Menu/Menu';
import About from './About/About';
import Login from './Login/Login';
import Manager from './Manager/ManagerDashboard';
import EmployeeManager from './Manager/Employee/EmployeeManager';
import OrderManager from './Manager/Order/OrderManager';
import RevenueStats from './Manager/Revenue/RevenueStats';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Login />} />
          <Route path="manager" element={<Manager />} /> 
          <Route path="/manager/employees" element={<EmployeeManager />} />
          <Route path="/orders" element={<OrderManager />} />
          <Route path="/manager/revenue" element={<RevenueStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
