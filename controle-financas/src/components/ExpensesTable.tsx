import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, Button } from '@mui/material';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import { Trash, Pencil } from 'phosphor-react'; // Ícones

Modal.setAppElement('#root'); // Define o appElement para o modal

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controle do modal
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '', // Data como string
    user_id: '678d09f955d29bdc1f6c9bea', // Exemplo de usuário fixo
  });
  const [isEditing, setIsEditing] = useState(false); // Controle de edição
  const [currentExpenseId, setCurrentExpenseId] = useState<string>(''); // ID da despesa atual sendo editada

  useEffect(() => {
    fetchExpenses(); // Carregar despesas ao inicializar
  }, []);

  // Função para buscar despesas
  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8000/expenses');
      const data = await response.json();
      setExpenses(data.data);

      // Calculando a soma total dos valores
      const total = data.data.reduce((sum: number, expense: any) => sum + expense.amount, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Erro ao buscar as despesas:', error);
    }
  };

  const openModal = () => setModalIsOpen(true); // Função para abrir o modal
  const closeModal = () => {
    setModalIsOpen(false); // Fechar o modal
    setIsEditing(false); // Resetando o modo de edição
    setExpenseData({ // Limpando os campos do formulário
      description: '',
      amount: '',
      category: '',
      date: '',
      user_id: '678d09f955d29bdc1f6c9bea',
    });
  };

  const handleCreateExpense = async (event: React.FormEvent) => {
    event.preventDefault();

    // Se estamos no modo de edição, vamos atualizar a despesa
    if (isEditing && currentExpenseId) {
      // Atualizando a despesa
      try {
        const response = await fetch(`http://localhost:8000/expenses/${currentExpenseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expenseData),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message); // Exibir mensagem de sucesso
          setModalIsOpen(false); // Fechar o modal
          fetchExpenses(); // Atualiza a lista de despesas após a edição
        } else {
          toast.error(result.message); // Exibir mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao editar a despesa:', error);
        toast.error('Erro ao editar a despesa'); // Exibir erro caso a requisição falhe
      }
    } else {
      // Caso contrário, vamos criar uma nova despesa
      try {
        const response = await fetch('http://localhost:8000/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: expenseData.description,
            amount: expenseData.amount, // Enviado como string
            category: expenseData.category,
            date: expenseData.date, // Data como string
            user_id: expenseData.user_id,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message); // Exibir mensagem de sucesso
          setModalIsOpen(false); // Fechar o modal
          fetchExpenses(); // Atualiza a lista de despesas após a criação
        } else {
          toast.error(result.message); // Exibir mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao criar a despesa:', error);
        toast.error('Erro ao criar a despesa'); // Exibir erro caso a requisição falhe
      }
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${expenseId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message); // Exibir mensagem de sucesso
        fetchExpenses(); // Atualiza a lista de despesas após a exclusão
      } else {
        toast.error(result.message); // Exibir mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao excluir a despesa:', error);
      toast.error('Erro ao excluir a despesa'); // Exibir erro caso a requisição falhe
    }
  };

  const handleEditExpense = (expense: any) => {
    setExpenseData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      user_id: expense.user_id,
    });
    setIsEditing(true); // Setando como edição
    setCurrentExpenseId(expense._id); // Guardando o ID da despesa
    setModalIsOpen(true); // Abrir o modal para edição
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-6xl p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Despesas</h1>

        {/* Botão de Criar Despesa */}
        <div className="flex justify-center mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={openModal}
          >
            Criar Despesa
          </Button>
        </div>

        {/* Tabela de Despesas */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="despesas table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Descrição</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Data</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Usuário</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Ações</TableCell> {/* Coluna de Ações */}
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{expense.description}</TableCell>
                  <TableCell align="left">{expense.amount}</TableCell>
                  <TableCell align="left">{expense.category}</TableCell>
                  <TableCell align="left">{expense.date}</TableCell>
                  <TableCell align="left">{expense.user_id}</TableCell>
                  <TableCell align="center"> {/* Célula de Ações */}
                    <Button
                      onClick={() => handleEditExpense(expense)}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="mr-2"
                    >
                      <Pencil size={20} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteExpense(expense._id)} // Chame a função de deletar passando o id
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      <Trash size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} align="right" style={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold', paddingRight: '10px' }}>
                  {totalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>

      {/* Modal de Criar ou Editar Despesa */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Criar ou Editar Despesa"
        className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Despesa' : 'Criar Despesa'}</h2>

        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Descrição da despesa"
              value={expenseData.description}
              onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="text"
              name="amount"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Valor da despesa"
              value={expenseData.amount}
              onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              name="category"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={expenseData.category}
              onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
            >
              <option value="">Escolha a categoria</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Lazer">Lazer</option>
              <option value="Crédito">Crédito</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="text"
              name="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={expenseData.date}
              onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              {isEditing ? 'Salvar Alterações' : 'Criar Despesa'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExpensesTable;
