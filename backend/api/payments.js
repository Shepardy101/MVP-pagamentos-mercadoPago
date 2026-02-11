import express from 'express';
import * as mpService from '../src/services/mercadoPagoService.js';
import errorHandler from '../src/middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.post('/', async (req, res, next) => {
  try {
    const pagamento = await mpService.criarPagamento(req.body);
    res.status(201).json(pagamento);
  } catch (err) { next(err); }
});

app.get('/:id', async (req, res, next) => {
  try {
    const pagamento = await mpService.consultarPagamento(req.params.id);
    res.json(pagamento);
  } catch (err) { next(err); }
});

app.put('/:id', async (req, res, next) => {
  try {
    const pagamento = await mpService.cancelarPagamento(req.params.id);
    res.json(pagamento);
  } catch (err) { next(err); }
});

app.use(errorHandler);

export default app;
