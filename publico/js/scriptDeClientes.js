const formularioCliente = document.getElementById('formCliente');
formularioCliente.onsubmit = validarFormulario;

function validarFormulario(evento) {
  //Valida o formulário
    if (formularioCliente.checkValidity()) {
      formularioCliente.classList.remove('was-validated');
      const cpf = document.getElementById('cpf').value;
      const nome = document.getElementById('nome').value;
      const dt_nasc = document.getElementById('dt_nasc').value;
      const cep = document.getElementById('cep').value;
      const endereco = document.getElementById('endereco').value;
      const bairro = document.getElementById('bairro').value;
      const cidade = document.getElementById('cidade').value;
      const uf = document.getElementById('uf').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
          
      const cliente = new Clientes(cpf, nome, dt_nasc, cep, endereco, bairro, cidade, uf, telefone, email);
      cadastrarCliente(cliente);
    }
   else{
      formularioCliente.classList.add('was-validated');	//diz ao bootstrap exibir mensagens de validação
   }
   evento.preventDefault(); //onsubmit deixa de ter o comportamento padrão de envio de formulário
   evento.stopPropagation(); //Outros interessados no evento de submissão não saberão que ele aconteceu.
  
}
function cadastrarCliente(cliente){
  // FETCH API para fazer requisiçoes http
  fetch('http://localhost:3000/clientes/', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
   }).then((resposta) => {
        return resposta.json(); 
  }).then((dados) => {
    if(dados.status){
      formularioCliente.reset();
      mostrarMensagem(dados.mensagem, true);

    } else {
      mostrarMensagem(dados.mensagem, false);
    }
    
  })
  .catch(erro) => {
    mostrarMensagem(erro.message, false);
  });

}

function mostrarMensagem(mensagem, sucesso = false){
  const divMensagem = document.getElementById('mensagem');

  if (sucesso){
    divMensagem.innerHTML = `
    <div class="alert alert-success" role="alert">
    ${mensagem}
    </div>`; //string literals
} 
  else{
    divMensagem.innerHTML=` 
    <div class="alert alert-danger" role="alert">
    ${mensagem} 
    </div>`;
}
  setTimeout(() => {
    divMensagem.innerHTML = '';
}, 5000);

}
