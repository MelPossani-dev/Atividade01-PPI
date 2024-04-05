import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import { error } from 'console';
import rotaCliente from  './Rotas/rotaClientes.js'; 
import CtrlCliente from './Controllers/CtrlCliente.js';

const host='0.0.0.0'; 
const porta = 3000;  

const app = express();

app.use(express.json());
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
app.use(express.json());
app.use('/clientes', rotaCliente);

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.use('/controle', rotaCliente);
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})

/*const cliente = new Cliente(1,
                    '299.444.555-00',
                    'Beltrano Fulano da Silva',
                    '05/09/1946',
                    '17200-000',
                    'Rua Não sei',
                    'Quem sabe né?',
                    'Jaú',
                    'SP',
                    '(14) 23333-9999',
                    'otalfulano@gmail.com');

/*cliente.cadastrar().then(() => {
    console.log('Cadastrado!');
}).catch((erro) => {
    console.log(erro.message);
});

const clienteQQ = new Cliente();

let listaClientes = [];

clienteQQ.consultar('Fulano').then((listaClientes) => {
    console.log('Clientes encontrados:');
    for (const cliente of listaClientes){
        console.log(cliente.toJSON());
}
}).catch((erro) => {
    console.log(`Nao foi possível encontrar o cliente: ${erro.message}`);
});
*/