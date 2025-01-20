import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, Button } from '@mui/material';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import { Trash, Pencil } from 'phosphor-react'; // Ícones para editar e excluir

Modal.setAppElement('#root'); // Define o appElement para o modal

const ReceiptsTable = () => {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controle do modal
  const [receiptData, setReceiptData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '', // Data como string
  });
  const [isEditing, setIsEditing] = useState(false); // Controle de edição
  const [currentReceiptId, setCurrentReceiptId] = useState<string>(''); // ID da receita sendo editada

  useEffect(() => {
    fetchReceipts(); // Carregar receitas ao inicializar
  }, []);

  // Função para buscar receitas
  const fetchReceipts = async () => {
    try {
      const response = await fetch('http://localhost:8000/receipts');
      const data = await response.json();
      setReceipts(data.data);

      // Calculando a soma total dos valores
      const total = data.data.reduce((sum: number, receipt: any) => sum + receipt.amount, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Erro ao buscar as receitas:', error);
    }
  };

  const openModal = () => setModalIsOpen(true); // Função para abrir o modal
  const closeModal = () => {
    setModalIsOpen(false); // Fechar o modal
    setIsEditing(false); // Resetando o modo de edição
    setReceiptData({ // Limpando os campos do formulário
      description: '',
      amount: '',
      category: '',
      date: '',
    });
  };

  const handleCreateOrEditReceipt = async (event: React.FormEvent) => {
    event.preventDefault();

    // Se estamos no modo de edição, vamos atualizar a receita
    if (isEditing && currentReceiptId) {
      // Atualizando a receita
      try {
        const response = await fetch(`http://localhost:8000/receipts/${currentReceiptId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(receiptData),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message); // Exibir mensagem de sucesso
          setModalIsOpen(false); // Fechar o modal
          fetchReceipts(); // Atualiza a lista de receitas após a edição
        } else {
          toast.error(result.message); // Exibir mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao editar a receita:', error);
        toast.error('Erro ao editar a receita'); // Exibir erro caso a requisição falhe
      }
    } else {
      // Caso contrário, vamos criar uma nova receita
      try {
        const response = await fetch('http://localhost:8000/receipts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: receiptData.description,
            amount: receiptData.amount, // Enviado como string
            category: receiptData.category,
            date: receiptData.date, // Data como string
          }),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message); // Exibir mensagem de sucesso
          setModalIsOpen(false); // Fechar o modal
          fetchReceipts(); // Atualiza a lista de receitas após a criação
        } else {
          toast.error(result.message); // Exibir mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao criar a receita:', error);
        toast.error('Erro ao criar a receita'); // Exibir erro caso a requisição falhe
      }
    }
  };

  const handleDeleteReceipt = async (receiptId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/receipts/${receiptId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message); // Exibir mensagem de sucesso
        fetchReceipts(); // Atualiza a lista de receitas após a exclusão
      } else {
        toast.error(result.message); // Exibir mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao excluir a receita:', error);
      toast.error('Erro ao excluir a receita'); // Exibir erro caso a requisição falhe
    }
  };

  const handleEditReceipt = (receipt: any) => {
    setReceiptData({
      description: receipt.description,
      amount: receipt.amount,
      category: receipt.category,
      date: receipt.date,
    });
    setIsEditing(true); // Setando como edição
    setCurrentReceiptId(receipt._id); // Guardando o ID da receita
    setModalIsOpen(true); // Abrir o modal para edição
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-6xl p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Receitas</h1>
        
        {/* Botão para Criar Receita */}
        <div className="flex justify-center mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={openModal}
          >
            Criar Receita
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="receitas table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Descrição</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Data</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Ações</TableCell> {/* Coluna de Ações */}
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.map((receipt, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{receipt.description}</TableCell>
                  <TableCell align="left">{receipt.amount}</TableCell>
                  <TableCell align="left">{receipt.category}</TableCell>
                  <TableCell align="left">{receipt.date}</TableCell>
                  <TableCell align="center"> {/* Célula de Ações */}
                    <Button
                      onClick={() => handleEditReceipt(receipt)}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="mr-2"
                    >
                      <Pencil size={20} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteReceipt(receipt._id)} // Chame a função de deletar passando o id
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

      {/* Modal de Criar ou Editar Receita */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Criar ou Editar Receita"
        className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Receita' : 'Criar Receita'}</h2>

        <form onSubmit={handleCreateOrEditReceipt} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Descrição da receita"
              value={receiptData.description}
              onChange={(e) => setReceiptData({ ...receiptData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="text"
              name="amount"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Valor da receita"
              value={receiptData.amount}
              onChange={(e) => setReceiptData({ ...receiptData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              name="category"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={receiptData.category}
              onChange={(e) => setReceiptData({ ...receiptData, category: e.target.value })}
            >
              <option value="">Escolha a categoria</option>
              <option value="Salário">Salário</option>
              <option value="Extra">Extra</option>
              <option value="Devedores">Devedores</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="text"
              name="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={receiptData.date}
              onChange={(e) => setReceiptData({ ...receiptData, date: e.target.value })}
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
              {isEditing ? 'Salvar Alterações' : 'Criar Receita'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceiptsTable;
