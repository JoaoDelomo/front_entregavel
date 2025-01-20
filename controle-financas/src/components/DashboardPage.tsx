import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale);

const DashboardPage = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalReceipts, setTotalReceipts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResponse = await fetch('http://localhost:8000/expenses');
        const expenseData = await expenseResponse.json();
        setExpenses(expenseData.data);
        setTotalExpenses(expenseData.data.reduce((sum: number, expense: any) => sum + expense.amount, 0));

        const receiptResponse = await fetch('http://localhost:8000/receipts');
        const receiptData = await receiptResponse.json();
        setReceipts(receiptData.data);
        setTotalReceipts(receiptData.data.reduce((sum: number, receipt: any) => sum + receipt.amount, 0));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const pieChartData = {
    labels: ['Despesas', 'Receitas'],
    datasets: [
      {
        label: 'Total',
        data: [totalExpenses, totalReceipts],
        backgroundColor: ['#FF6347', '#3b82f6'],
        borderColor: ['#FF6347', '#3b82f6'],
        borderWidth: 1,
      },
    ],
  };

  const categories = expenses.reduce((acc: any, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Despesas por Categoria',
        data: Object.values(categories),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-full">


      {/* Dashboard */}
      <div className="flex-1 bg-gray-900 text-white p-8 h-full">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

        <div className="flex gap-10">
          {/* Gráfico de Pizza */}
          <div className="flex flex-col items-center w-1/2">
            <h2 className="text-xl font-bold text-center mb-4">Despesas vs Receitas</h2>
            <Doughnut data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          {/* Gráfico de Barras */}
          <div className="flex flex-col items-center w-1/2">
            <h2 className="text-xl font-bold text-center mb-4">Despesas por Categoria</h2>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
