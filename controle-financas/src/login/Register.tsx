import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';  // Importando o toast
import { useNavigate } from 'react-router-dom';  // Importando o hook de navegação

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Erro ao fazer o registro');
        toast.error(data.detail || 'Erro ao fazer o registro'); // Exibe o erro com toast
      } else {
        toast.success('Registro realizado com sucesso'); // Exibe o sucesso com toast
        setTimeout(() => {
          navigate('/');  // Redireciona para o login após o sucesso
        }, 2000); // Aguarda 2 segundos antes de redirecionar para o login
      }
    } catch (err) {
      setError('Erro na conexão');
      toast.error('Erro na conexão');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Registre a sua conta</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Seu nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="bg-gray-700 text-white w-full p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Seu Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@exemplo.com"
              className="bg-gray-700 text-white w-full p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-700 text-white w-full p-2 rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Registrar
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Já possui uma conta? <a href="/" className="text-blue-400">Faça o Login aqui</a>
        </p>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      {/* Adiciona o componente Toaster aqui */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Register;
