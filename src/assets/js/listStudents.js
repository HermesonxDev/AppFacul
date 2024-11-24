document.addEventListener('DOMContentLoaded', async function () {
    // URL para buscar os dados
    const apiUrl = 'http://localhost:3000/users/getAll/';

    // Função para buscar os dados da API
    async function fetchStudents() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Erro ao buscar os dados dos estudantes.');

            const data = await response.json(); // Converte a resposta em JSON

            // Retorna somente os usuários do tipo "Aluno"
            return (data.users || []).filter(user => user.type === 'Aluno');
        } catch (error) {
            console.error(error);
            alert('Erro ao carregar a lista de estudantes. Por favor, tente novamente.');
            return [];
        }
    }

    // Função para exibir os dados na tabela
    function displayStudents(studentList) {
        const tableBody = document.getElementById('student-list');
        tableBody.innerHTML = ''; // Limpa o conteúdo anterior

        studentList.forEach(function (student) {
            const row = document.createElement('tr');

            const cellId = document.createElement('td');
            cellId.textContent = student.id;
            row.appendChild(cellId);

            const cellName = document.createElement('td');
            cellName.textContent = student.name;
            row.appendChild(cellName);

            const cellEmail = document.createElement('td');
            cellEmail.textContent = student.email;
            row.appendChild(cellEmail);

            tableBody.appendChild(row);
        });
    }

    // Busca os estudantes da API e exibe na tabela
    const students = await fetchStudents();
    displayStudents(students);

    // Filtragem pelo campo de pesquisa
    document.getElementById('search').addEventListener('keyup', function () {
        const searchValue = this.value.toLowerCase();
        const filteredStudents = students.filter(function (student) {
            return student.name.toLowerCase().includes(searchValue);
        });
        displayStudents(filteredStudents);
    });
});
