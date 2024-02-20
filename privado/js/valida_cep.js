const cepInput = document.getElementById("cep");
const logradouroInput = document.getElementById("endereco");

cepInput.addEventListener("input", async () => {
  const cep = cepInput.value.replace(/\D/g, "");
  const cepRegex = /^[0-9]{8}$/;

  if (cepRegex.test(cep)) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      logradouroInput.value = data.logradouro;
    }
  }
});