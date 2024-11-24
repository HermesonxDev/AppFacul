document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = { name, email, password, type: "Aluno" };

        try {
            const response = await axios.post("http://localhost:3000/users/create/", data);

            if (response.status === 201) {
                alert("Usuário criado com sucesso!");
                localStorage.setItem('logged', 'true');
                window.location.href = "../pages/home.html";
                form.reset();
            } else {
                alert("Erro ao criar usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        }
    });
});