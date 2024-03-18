import { Router } from 'express';
import ClienteCtrl from '../Controllers/CtrlCliente.js';

const rotaCliente = new Router();
const cliCtrl = new ClienteCtrl();

rotaCliente
.get('/', cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)  //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', cliCtrl.gravar)
.put('/:codigo', cliCtrl.atualizar)
.patch('/:codigo', cliCtrl.atualizar)
.delete('/:codigo', cliCtrl.excluir);


export default rotaCliente;