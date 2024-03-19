import { Router } from 'express';
import CtrlCliente from '../Controllers/CtrlCliente.js';

const rotaCliente = new Router();
const ctrlCli = new CtrlCliente();

rotaCliente
.get('/', ctrlCli.consultar)
.get('/: termo', ctrlCli.consultar)
.post('/', ctrlCli.gravar)
.put('/: codigo', ctrlCli.atualizar)
.patch('/: codigo', ctrlCli.atualizar)
.delete('/: codigo', ctrlCli.excluir);


export default rotaCliente;