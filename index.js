import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import Cliente from './publico/js/Clientes.js';

const host='0.0.0.0'; //O ip 0.0.0.0 representa todas as interfaces (placas de rede) do computador onde essa aplicação for executada
const porta = 3000;  //Porta identifica um programa em execução no host hospedeiro
const app = express(); //instância do Express

app.use(express.urlencoded({extended: true})); //biblioteca qs


//gerencie uma sessão como sendo uma espécie de memória adquirida pelo servidor para lembrar com quem ele conversa
app.use(session({
    secret: '$&n#@',
    resave: false,
    saveUninitialized: true,
    cookie: {  
        maxAge: 60 * 1000 * 15
    }
}))

//O express oferece funcionalidades para permitir que conteúdo estático seja fornecido
app.use(express.static(path.join(process.cwd(), 'publico')));

app.post('/login', (requisicao, resposta)=>{
    const { usuario, senha } = requisicao.body;
    if (usuario && senha && usuario === 'Melissa' && senha === '0903'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/index.html');
    } else{
        resposta.redirect('/login.html');
    }
})

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})
const cliente = new Cliente(2,
    'Bruce Dickinson',
    '(14) 99999-9999',
    'brucedickinson@gmail.com',
    'Rua Sei Lá, 1234',
    'São Paulo',
    'SP',
    '123.456.789-01',
    '07/08/1958');

//nos metodos assincronos é preciso manipular as promesses (promises)
//Então, em algum momento o metodo trará uma resposta e o nosso programa
//não saberá quando isso irá acontecer.
cliente.gravar().then(() => {
console.log('Cliente atualizado com sucesso');
}).catch((erro) => {
console.log(erro.message);
});

/*const clienteQQ = new Cliente();

let listaClientes = [];

clienteQQ.consultar('Geraldo').then((lista) => {
listaClientes = lista;
}).catch(erro => {
console.log(`Nao foi possível encontrar o cliente: ${erro.message}`);
})*/