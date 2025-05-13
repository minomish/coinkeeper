import React, { useState } from 'react';
import './WalletMenu.css';
import { FaCoins, FaHome, FaUser, FaWallet, FaCog, FaSignOutAlt, FaChartPie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const WalletMenu = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate(); // Хук для программной навигации

  const menuItems = [
    { key: 'dashboard', label: 'Home', icon: <FaHome />, to: '/dashboard' },
    { key: 'stats', label: 'Statistics', icon: <FaChartPie />, to: '/stats' },
    { key: 'settings', label: 'Categories', icon: <FaCog />, to: '/settings' },
  ];

  const footerItems = [
    { key: 'logout', label: 'Log Out', icon: <FaSignOutAlt />, to: '/' },
  ];

  const handleClick = (key, to) => {
    setActiveTab(key);
    navigate(to); // Программная навигация
  };

  return (
    <div className="wallet-menu">
      <div>
        <div className="wallet-menu__header">
          <FaCoins color='#1890ff'/>
          <h3>FinanceManager</h3>
        </div>

        <ul className="wallet-menu__list">
          {menuItems.map(item => (
            <li
              key={item.key}
              className={`wallet-menu__item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => handleClick(item.key, item.to)}
            >
              <span className="wallet-menu__icon">{item.icon}</span>
              <span className="wallet-menu__text">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="wallet-menu__footer">
        {footerItems.map(item => (
          <li
            key={item.key}
            className={`wallet-menu__footer-item ${item.key === 'logout' ? 'wallet-menu__logout' : ''}`}
            onClick={() => handleClick(item.key, item.to)}
          >
            <span className="wallet-menu__footer-icon">{item.icon}</span>
            <span className="wallet-menu__footer-text">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletMenu;
