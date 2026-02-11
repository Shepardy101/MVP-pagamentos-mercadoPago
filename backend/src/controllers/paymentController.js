import * as mpService from '../services/mercadoPagoService.js';

export const criar = async (req, res, next) => {
  try {
    const pagamento = await mpService.criarPagamento(req.body);
    res.status(201).json(pagamento);
  } catch (err) { next(err); }
};

export const consultar = async (req, res, next) => {
  try {
    const pagamento = await mpService.consultarPagamento(req.params.id);
    res.json(pagamento);
  } catch (err) { next(err); }
};

export const cancelar = async (req, res, next) => {
  try {
    const pagamento = await mpService.cancelarPagamento(req.params.id);
    res.json(pagamento);
  } catch (err) { next(err); }
};
