import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import WalletMenu from './components/WalletMenu/WalletMenu';
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import StatsPage from './pages/StatsPage/StatsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import DashboardPage from './pages/DashboardPage/DashboardPage';

const App = () => {
  const location = useLocation();
  const hideWalletMenu = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="app">
      {!hideWalletMenu && <WalletMenu />}
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export default App;
