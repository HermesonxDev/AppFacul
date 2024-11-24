document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'http://localhost:3000/users/getAll/';
    const updateUrl = 'http://localhost:3000/users/update/';
    const form = document.getElementById('userForm');

    // Função para obter o ID do usuário a partir da URL
    function getUserIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    const userId = getUserIdFromUrl();
    if (!userId) {
        alert('ID do usuário não fornecido!');
        window.location.href = './listStudents.html'; // Redireciona para a listagem se o ID não for encontrado
        return;
    }

    // Função para buscar os dados do usuário
    async function fetchUserData() {
        try {
            const response = await axios.get(apiUrl);
            const user = response.data.users.find(user => user.id === parseInt(userId));
            if (!user) {
                alert('Usuário não encontrado!');
                window.location.href = './listStudents.html';
                return;
            }
            populateForm(user);
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar os dados do usuário.');
        }
    }

    // Preenche o formulário com os dados do usuário
    function populateForm(user) {
        document.getElementById('name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('password').value = user.password || '';
        document.getElementById('type').value = user.type || '';
    }

    // Atualiza os dados do usuário no servidor
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            type: document.getElementById('type').value,
        };

        try {
            const response = await axios.put(`${updateUrl}${userId}`, updatedData);
            alert('Usuário atualizado com sucesso!');
            window.location.href = './home.html'; // Redireciona para a listagem após a edição
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar o usuário.');
        }
    });

    // Inicializa o carregamento dos dados do usuário
    fetchUserData();
});