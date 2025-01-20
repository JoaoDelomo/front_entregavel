import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import ExpensesTable from './components/ExpensesTable';
import ReceiptsTable from './components/ReceiptsTable';
import Sidebar from './components/Sidebar'; // Importando a Sidebar
import Login from './login/Login';
import Register from './login/Register';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation(); // Hook para obter a localização atual

  // Renderiza a Sidebar apenas se não estiver na rota "/"
  const showSidebar = !['/', '/register'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar será exibida somente se não estiver na página de login */}
      {showSidebar && <Sidebar />}

      {/* Main content à direita */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesTable />} />
          <Route path="/receipts" element={<ReceiptsTable />} />
          <Route path="/" element={<Login />} /> {/* Login sem Sidebar */}
          <Route path="/register" element={<Register />} /> {/* Login sem Sidebar */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
