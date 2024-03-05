import conectar from "./conexao.js"; //não esquecer de colocar a extensão .js no final
import Cliente from "../publico/js/Clientes.js";
//DAO - Data Access Object
export default class ClienteDAO{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (cpf, nome, dt_nasc, cep, endereco, bairro,
                         cidade, estado, telefone, email) 
                         values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.dt_nasc,
                cliente.cep,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.estado,
                cliente.telefone,
                cliente.email
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            //funcionalidade interessante oferecida pela biblioteca mysql2
            cliente.codigo = resultados.insertId; //recupera o id gerado pelo banco de dados
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cpf = ?, nome = ?,
                         dt_nasc = ?, cep = ?, endereco = ?,
                         bairro = ?, cidade = ?, estado = ?, 
                         telefone = ?, email = ? WHERE id_cliente = ?`;
            const parametros = [
                cliente.id_cliente,
                cliente.cpf,
                cliente.nome,
                cliente.dt_nasc,
                cliente.cep,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.estado,
                cliente.telefone,
                cliente.email
            ];

           await conexao.execute(sql,parametros);
           
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE id_cliente = ?`;
            const parametros = [
                cliente.id_cliente
            ]
            await conexao.execute(sql,parametros);
        }
    }

    //termo de pesquisa pode ser o código do cliente ou ainda o nome
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ //termo de pesquina não é um número
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM cliente WHERE id_cliente = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        //Utilizar os registros encontrados para criar novos objetos do tipo cliente
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(
                registro.id_cliente,
                registro.cpf,
                registro.nome,
                registro.dt_nasc,
                registro.cep,
                registro.endereco,
                registro.bairro,
                registro.cidade,
                registro.estado,
                registro.telefone,
                registro.email
            );
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}