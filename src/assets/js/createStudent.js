  // Seleciona o formulário pelo ID
  const userForm = document.getElementById('userForm');

  // Adiciona o evento de envio ao formulário
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do envio do formulário

    // Captura os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Cria o objeto com os dados do usuário, incluindo o tipo "Aluno"
    const userData = {
      name,
      email,
      password,
      type: "Aluno", // Adiciona o tipo "Aluno"
    };

    try {
      // Envia os dados para a URL usando Axios
      const response = await axios.post('http://localhost:3000/users/create/', userData);

      // Verifica a resposta e mostra feedback ao usuário
      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = './home.html'; // Redireciona para a página de home
      } else {
        alert('Algo deu errado ao cadastrar o usuário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      alert('Erro ao cadastrar o usuário. Tente novamente mais tarde.');
    }
  });