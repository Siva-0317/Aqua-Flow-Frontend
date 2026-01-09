import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage key="dashboard" />;
      case 'history':
        return <HistoryPage key="history" />;
      case 'settings':
        return <SettingsPage key="settings" />;
      default:
        return <DashboardPage key="dashboard" />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 overflow-hidden">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
