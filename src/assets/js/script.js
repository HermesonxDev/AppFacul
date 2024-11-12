document.addEventListener('DOMContentLoaded', function() {
    var students = [
        { id: 1, name: 'João Silva', serie: '5º Ano', turma: 'A', turno: 'Manhã', motherName: 'Maria Silva', email: 'joao.silva@example.com' },
        { id: 2, name: 'Maria Oliveira', serie: '6º Ano', turma: 'B', turno: 'Tarde', motherName: 'Ana Oliveira', email: 'maria.oliveira@example.com' },
        { id: 3, name: 'Pedro Santos', serie: '7º Ano', turma: 'C', turno: 'Noite', motherName: 'Clara Santos', email: 'pedro.santos@example.com' },
        { id: 4, name: 'Ana Costa', serie: '8º Ano', turma: 'A', turno: 'Manhã', motherName: 'Luiza Costa', email: 'ana.costa@example.com' },
        { id: 5, name: 'Fabio Dias', serie: '9º Ano', turma: 'B', turno: 'Tarde', motherName: 'Fernanda Dias', email: 'fabio.dias@example.com' }
    ];

    function displayStudents(studentList) {
        var tableBody = document.getElementById('student-list');
        tableBody.innerHTML = '';
        studentList.forEach(function(student) {
            var row = document.createElement('tr');

            var cellId = document.createElement('td');
            cellId.textContent = student.id;
            row.appendChild(cellId);

            var cellName = document.createElement('td');
            cellName.textContent = student.name;
            row.appendChild(cellName);

            var cellSerie = document.createElement('td');
            cellSerie.textContent = student.serie;
            row.appendChild(cellSerie);

            var cellTurma = document.createElement('td');
            cellTurma.textContent = student.turma;
            row.appendChild(cellTurma);

            var cellTurno = document.createElement('td');
            cellTurno.textContent = student.turno;
            row.appendChild(cellTurno);

            var cellMotherName = document.createElement('td');
            cellMotherName.textContent = student.motherName;
            row.appendChild(cellMotherName);

            var cellEmail = document.createElement('td');
            cellEmail.textContent = student.email;
            row.appendChild(cellEmail);

            tableBody.appendChild(row);
        });
    }

    displayStudents(students);

    document.getElementById('search').addEventListener('keyup', function() {
        var searchValue = this.value.toLowerCase();
        var filteredStudents = students.filter(function(student) {
            return student.name.toLowerCase().includes(searchValue);
        });
        displayStudents(filteredStudents);
    });
});