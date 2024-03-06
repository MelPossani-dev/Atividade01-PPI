import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import Cliente from './Modelos/Clientes.js';

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
const cliente = new Cliente(1,
                    '299.364.902-09',
                    'Freddie Krueger',
                    '05/09/1946',
                    '17200-111',
                    'Rua Sei Lá',
                    'Quem sabe né?',
                    'São Paulo',
                    'SP',
                    '(14) 23333-9999',
                    'freddiequeen@gmail.com');
//nos metodos assincronos é preciso manipular as promesses (promises)
//Então, em algum momento o metodo trará uma resposta e o nosso programa
//não saberá quando isso irá acontecer.
cliente.atualizar().then(() => {
    console.log('Cliente Atualizado com sucesso');
}).catch((erro) => {
      console.log(erro.message);
});

/*const clienteQQ = new Cliente();

let listaClientes = [];

clienteQQ.consultar('Bruce').then((listaClientes) => {
    console.log('Clientes encontrados:');
    for (const cliente of listaClientes){
        console.log(cliente.toJSON());
}
}).catch((erro) => {
    console.log(`Nao foi possível encontrar o cliente: ${erro.message}`);
});*/
