import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import Cliente from './publico/js/Clientes.js';

const host='0.0.0.0';
const porta = 3000; 
const app = express(); 

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: '$&n#@',
    resave: false,
    saveUninitialized: true,
    cookie: {  
        maxAge: 60 * 1000 * 15
    }
}))

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
const cliente = new Cliente(0,
                    '299.364.902-09',
                    'ulano de Tal da Silva',
                    '05/09/1946',
                    '17200-111',
                    'Rua Sei Lá',
                    'Quem sabe né?',
                    'São Paulo',
                    'SP',
                    '(14) 23333-9999',
                    'otalfulano@gmail.com');

cliente.cadastrar().then(() => {
    console.log('Cliente Excluido com sucesso');
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
