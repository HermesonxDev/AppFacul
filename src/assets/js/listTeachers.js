document.addEventListener('DOMContentLoaded', async function () {
    const apiUrl = 'http://localhost:3000/users/getAll/';
    const deleteUrl = 'http://localhost:3000/users/delete/';
    const updateUrl = 'http://localhost:3000/users/update/';

    async function fetchStudents() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Erro ao buscar os dados dos professores.');

            const data = await response.json();
            return (data.users || []).filter(user => user.type === 'Professor');
        } catch (error) {
            console.error(error);
            alert('Erro ao carregar a lista de professores. Por favor, tente novamente.');
            return [];
        }
    }

    function displayStudents(studentList) {
        const tableBody = document.getElementById('student-list');
        tableBody.innerHTML = '';

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

            const cellActions = document.createElement('td');
            cellActions.classList.add('d-flex', 'gap-2');

            // Botão Editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-warning', 'btn-sm');
            editButton.addEventListener('click', function () {
                // Redireciona para a página de edição com o ID do usuário na URL
                window.location.href = `editUser.html?id=${student.id}`;
            });
            cellActions.appendChild(editButton);

            // Botão Deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', async function () {
                if (confirm(`Tem certeza que deseja deletar o professor ${student.name}?`)) {
                    try {
                        const response = await fetch(`${deleteUrl}${student.id}`, { method: 'DELETE' });
                        if (!response.ok) throw new Error('Erro ao deletar o professor.');
                        alert('Professor deletado com sucesso!');
                        const updatedStudents = await fetchStudents(); // Atualiza a lista após exclusão
                        displayStudents(updatedStudents);
                    } catch (error) {
                        console.error(error);
                        alert('Erro ao deletar o professor. Por favor, tente novamente.');
                    }
                }
            });
            cellActions.appendChild(deleteButton);

            row.appendChild(cellActions);
            tableBody.appendChild(row);
        });
    }

    const students = await fetchStudents();
    displayStudents(students);

    document.getElementById('search').addEventListener('keyup', function () {
        const searchValue = this.value.toLowerCase();
        const filteredStudents = students.filter(student =>
            student.name.toLowerCase().includes(searchValue)
        );
        displayStudents(filteredStudents);
    });
});
