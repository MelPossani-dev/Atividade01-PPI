import Cliente from "../Modelos/Clientes.js";

export default class CtrlCliente{

    //Esta Classe terá a responsabilidade de traduzir pedidos HTTP em 
    //comandos internos da aplicação
    //A nossa aplicação sabe gravar, atualizar, excluir e consultar clientes 
    //no banco de dados

    //Será necessário manipular requisições HTTP
    //Requisições HTTP (GET, POST, PUT ou PATCH, DELETE)

    //Camada de controle será síncrona, então resolveremos os métodos assíncronos (promises)

    gravar(requisicao, resposta){

        //prepar o método gravar para produzir respostas no formato JSON
        resposta.type('application/json');

        //HTTP gravar um cliente é enviar uma requisição do tipo POST
        //trazendo dados no formato JSON
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            const cpf = dados.cpf;
            const nome = dados.nome;
            const dt_nasc = dados.dt_nasc;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const telefone = dados.telefone;
            const email = dados.email;

            //pseudo validação nos dados
            if (cpf && nome && dt_nasc && cep && endereco && bairro && cidade && estado && telefone && email){
                const cliente = new Cliente(0, cpf, nome, dt_nasc, cep, endereco, bairro, cidade, estado, telefone, email);
                cliente.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente gravado com sucesso!",
                        "codigo_cliente": cliente.codigo
                    });
                }).catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o cliente! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do cliente, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
            "status":false,
            "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um cliente!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            //o código será extraído da url, exemplo: http://localhost:3000/cliente/1  1 é o código
            const id_cliente = requisicao.params.id_cliente;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const dt_nasc = dados.dt_nasc;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const telefone = dados.telefone;
            const email = dados.email;
            if (id_cliente && id_cliente > 0 && cpf && nome && dt_nasc && cep && endereco && bairro && cidade && estado && telefone && email)
            {
                const cliente = new Cliente(id_cliente, cpf, nome, dt_nasc, cep, endereco, bairro, cidade, estado, telefone, email);
                cliente.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente atualizado com sucesso!",
                    })
                })
                .catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o cliente! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do cliente, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um cliente!"
            })
        }
    }
    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            //o código do cliente que será excluído será extraído da url
            const id_cliente = requisicao.params.id_cliente;
            if (id_cliente && id_cliente > 0){
                const cliente = new Cliente(id_cliente);
                cliente.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o cliente! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do cliente que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um cliente!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const cliente = new Cliente(0);
            cliente.consultar(termoDePesquisa)
            .then((clientes)=>{
                resposta.status(200);
                resposta.json(clientes);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os clientes! " + erro.message
                })
            })
        }
    }
}          

// PAREI AQUI!!
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os clientes!"
            })
        }
    }

}