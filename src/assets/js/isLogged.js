// auth.js
export function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('logged') === 'true';
  
    if (!isLoggedIn) {
      alert('Você precisa estar logado para acessar esta página.');
      window.location.href = '../pages/signIn.html';
    }
}  