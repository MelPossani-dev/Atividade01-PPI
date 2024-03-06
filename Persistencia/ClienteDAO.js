import conectar from "./conexao.js"; 
import Cliente from "../publico/js/Clientes.js";

//DAO - Data Access Object
export default class ClienteDAO{

    async cadastrar(cliente){
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
            cliente.codigo = resultados.insertId;
            
        }
 }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cpf = ?, nome = ?,
                             dt_nasc = ?, cep = ?, endereco = ?,
                             bairro = ?, cidade = ?, estado = ?, 
                             telefone = ?, email = ? WHERE id_cliente = ?`;
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
                cliente.email,
                cliente.id_cliente
                ];
    
            await conexao.execute(sql, parametros);
                
            }
        } 
       
    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf = ?`;
            const parametros = [
                cliente.cpf
            ]
            await conexao.execute(sql,parametros);
        }
    }
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM cliente WHERE id_cliente = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
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