document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;

        try {
            const response = await axios.post("http://localhost:3000/users/checkUser/", {email});

            if (response.status === 200) {
                alert("Usuário logado com sucesso!");
                localStorage.setItem('logged', 'true');
                window.location.href = "../pages/home.html";
                form.reset();
            } else {
                alert("Erro ao logar usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        }
    });
});