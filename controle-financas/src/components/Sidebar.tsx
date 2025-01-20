import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Substituindo useHistory por useNavigate
import { House, FileText, Receipt, SignOut } from 'phosphor-react'; // Ícone de Sign Out do Phosphor

const Sidebar = () => {
  const navigate = useNavigate(); // Usando useNavigate para redirecionar após o logout
  const userName = localStorage.getItem('userName') || 'Usuário'; // Pegando o nome do usuário do localStorage (ou 'Usuário' caso não haja)

  const handleSignOut = () => {
    // Remover o token e o nome do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    
    // Redirecionar o usuário para a página inicial
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <div
      className="w-1/4 bg-gray-800 text-white p-4 rounded-r-lg shadow-lg flex flex-col justify-between"
      style={{
        height: '100vh', // Sidebar ocupa toda a altura da tela
        borderRight: '2px solid white', // Linha fina entre sidebar e conteúdo
      }}
    >
      {/* Saudação */}
      <div className="mb-8 text-center">
        <h2 className="text-xl">Olá, {userName}</h2>
      </div>

      {/* Menu de Links */}
      <ul className="space-y-8 w-full"> 
        <li className="flex justify-center">
          <Link to="/dashboard">
            <button className="p-4 rounded-lg text-white hover:bg-blue-600 transition duration-300 flex justify-center items-center w-full">
              <House size={48} />
            </button>
          </Link>
        </li>
        <li className="flex justify-center">
          <Link to="/expenses">
            <button className="p-4 rounded-lg text-white hover:bg-blue-600 transition duration-300 flex justify-center items-center w-full">
              <FileText size={48} />
            </button>
          </Link>
        </li>
        <li className="flex justify-center">
          <Link to="/receipts">
            <button className="p-4 rounded-lg text-white hover:bg-blue-600 transition duration-300 flex justify-center items-center w-full">
              <Receipt size={48} />
            </button>
          </Link>
        </li>
      </ul>

      {/* Botão Sign Out */}
      <div className="flex justify-center mt-auto"> {/* Colocando o botão no final da sidebar */}
        <button
          onClick={handleSignOut}
          className="p-4 rounded-lg text-white hover:bg-red-600 transition duration-300 flex justify-center items-center w-full"
        >
          <SignOut size={48} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
