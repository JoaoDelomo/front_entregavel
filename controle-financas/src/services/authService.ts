// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL do seu back-end

// Função para login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Assume que o back-end retorna um token ou uma resposta com status
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Falha ao realizar o login');
  }
};

// Função para registro
export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar:', error);
    throw new Error('Falha ao realizar o registro');
  }
};
