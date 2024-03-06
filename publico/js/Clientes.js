import ClienteDAO from "../../Persistencia/ClienteDAO.js";
export default class Cliente{
    #id_cliente;
    #cpf
    #nome;
    #dt_nasc;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #estado;
    #telefone;
    #email;


    constructor(id_cliente = 0, cpf="", nome="", dt_nasc="", cep="", endereco="", bairro="", cidade="" , estado="", telefone="", email=""){  
        this.id_cliente = id_cliente;
        this.cpf = cpf;
        this.nome = nome;
        this.dt_nasc = dt_nasc;
        this.cep = cep;
        this.endereco = endereco;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;  
        this.telefone = telefone;  
        this.email = email;
    }
    get id_cliente (){
        return this.#id_cliente;
    }
    set id_cliente(new_id){
        this.#id_cliente = new_id;
    }
    get cpf (){
        return this.#cpf;
    }
    set cpf(new_cpf){
       return this.#cpf = new_cpf;
    }
    get nome (){
        return this.#nome;
    }
    set nome (new_nome){
        return this.#nome = new_nome;
    }
    get dt_nasc (){
        return this.#dt_nasc;
    }
    set dt_nasc (new_dt_nasc){
        return this.#dt_nasc = new_dt_nasc;
    }
    get cep (){
        return this.#cep;
    }
    set cep (new_cep){
        return this.#cep = new_cep;
    }
    get endereco (){
        return this.#endereco;
    }
    set endereco (new_endereco){
        return this.#endereco = new_endereco;
    }
    get bairro (){
        return this.#bairro;
    }
    set bairro (new_bairro){
        return this.#bairro = new_bairro;
    }
    get cidade (){
        return this.#cidade;
    }
    set cidade (new_cidade){
        return this.#cidade = new_cidade;
    }
    get estado (){
        return this.#estado;
    }
    set estado (new_estado){
        return this.#estado = new_estado;
    }
    get telefone (){
        return this.#telefone;
    }
    set telefone (new_telefone){
        return this.#telefone = new_telefone;
    }
    get email (){
        return this.#email;
    }
    set email (new_email){
        return this.#email = new_email;
    }
    
    // Armazenar no banco de dados
    async cadastrar(){
        const dao = new ClienteDAO();
        await dao.cadastrar(this);
    }
    async atualizar(){
        const dao = new ClienteDAO();
        await dao.atualizar(this);
    }
    async excluir(){
        const dao = new ClienteDAO();
        await dao.excluir(this);
    }
    async consultar(termoDePesquisa){
        const dao = new ClienteDAO();
        return await dao.consultar(termoDePesquisa);
    }
    toString(){
        return `Cliente id: ${this.id_cliente} - nome: ${this.nome}`
    }
    toJSON(){
        return{
            id_cliente: this.id_cliente,
            cpf: this.cpf,
            nome: this.nome,
            dt_nasc: this.dt_nasc,
            cep: this.cep,
            endereco: this.endereco,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
            telefone: this.telefone,
            email: this.email
        }
    }
}