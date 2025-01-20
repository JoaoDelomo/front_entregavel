
# Frontend - Aplicação de Gerenciamento de Despesas e Receitas

Este é o frontend da aplicação de gerenciamento de despesas e receitas, desenvolvido com **React** e **TaiAlwind CSS**.

## Funcionalidades

- **Tela de Login**: Permite que o usuário faça login utilizando seu e-mail e senha.
- **Dashboard**: Exibe gráficos de despesas e receitas, além de informações por categoria.
- **Gerenciamento de Despesas**: Permite ao usuário criar, listar, editar e excluir despesas.
- **Gerenciamento de Receitas**: Permite ao usuário criar, listar, editar e excluir receitas.
- **Logout**: Permite ao usuário sair da aplicação e redireciona para a página de login.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **React Router**: Roteamento de páginas dentro da aplicação.
- **Tailwind CSS**: Framework CSS para design responsivo e moderno.
- **Phosphor Icons**: Biblioteca de ícones utilizada na sidebar e botões.
- **React Hot Toast**: Para exibir notificações e mensagens.

## Instalação

1. Clone o repositório:
    ```bash
    git clone
    ```

2. Entre na pasta do projeto:
    ```bash
    cd 
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

    A aplicação estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

- **src/components**: Contém os componentes reutilizáveis da aplicação (e.g., Sidebar, Tabelas).
- **src/pages**: Contém as páginas da aplicação (e.g., DashboardPage, ReceiptsPage, ExpensesPage).
- **src/utils**: Funções auxiliares e hooks personalizados.
- **src/assets**: Imagens, ícones e outros arquivos estáticos.

## Funcionalidades da Interface

- **Sidebar**: Com links de navegação para Dashboard, Despesas, Receitas e Logout.
- **Dashboard**: Exibe gráficos interativos de despesas vs receitas e despesas por categoria.
- **Despesas e Receitas**: Tabelas interativas para visualização e gestão de despesas e receitas.
- **Login**: Tela de login onde o usuário pode se autenticar utilizando e-mail e senha.
- **Botão de Logout**: Disponível na Sidebar, permitindo que o usuário faça logout da aplicação.

## Notas
- Certifique-se de que o backend esteja rodando na porta `8000` (padrão configurado) para que as requisições da aplicação frontend funcionem corretamente.
- O token de autenticação será armazenado no `localStorage` e utilizado nas requisições subsequentes ao backend.
