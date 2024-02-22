function logout() {
    // Limpar os campos de entrada
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    // Redirecionar para a página de login
    window.location.href = "login.html";
}