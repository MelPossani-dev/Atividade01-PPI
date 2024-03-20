import { Router } from 'express';
import CtrlCliente from './../Controllers/CtrlCliente.js';

const rotaCliente = new Router();
const ctrlCli = new CtrlCliente();

rotaCliente
.get('/', ctrlCli.consultar)
.get('/:termo', ctrlCli.consultar)  //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', ctrlCli.gravar)
.put('/:codigo', ctrlCli.atualizar)
.patch('/:codigo', ctrlCli.atualizar)
.delete('/:codigo', ctrlCli.excluir);


export default rotaCliente;