// Seleciona o botão de logout
const logoutButton = document.getElementById('logoutButton');

// Adiciona o evento de clique
logoutButton.addEventListener('click', (event) => {
  event.preventDefault(); // Previne o comportamento padrão do link

  // Remove a variável 'logged' do localStorage
  localStorage.removeItem('logged');

  // Redireciona o usuário para a página de login (index.html)
  window.location.href = '../../index.html'; // Ajuste o caminho se necessário
});