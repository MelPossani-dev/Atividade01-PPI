// Função para validar o CPF
function validaCPF(cpf) {
    // Remove os pontos e traços do número
    cpf = cpf.replace(/\./g, "");
    cpf = cpf.replace(/-/g, "");
    // Verifica se o número tem 11 dígitos
    if (cpf.length != 11) {
      return false;
    }
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }
    // Valida o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11) {
      resto = 0;
    }
    if (resto != parseInt(cpf.charAt(9))) {
      return false;
    }
    // Valida o segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11) {
      resto = 0;
    }
    if (resto != parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  }

  // Seleciona o elemento input do formulário
  var cpfInput = document.getElementById("cpf");
  // Adiciona um evento de mudança no input para validar o CPF
  cpfInput.addEventListener("change", function() {
     var cpfValidado = validaCPF(this.value);
     if(cpfValidado){
       alert("CPF válido!");
     } else{
       alert("CPF inválido!");
       this.value="";
     }
  });