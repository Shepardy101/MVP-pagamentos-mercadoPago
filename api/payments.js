import axios from 'axios';

const MP_TOKEN = process.env.MP_TOKEN;
const apiMP = axios.create({
  baseURL: 'https://api.mercadopago.com',
  headers: {
    Authorization: `Bearer ${MP_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export async function getPendentes(req, res) {
  try {
    const params = {
      status: 'pending,in_process,authorized',
      sort: 'date_created',
      order: 'desc',
      limit: 20
    };
    const resposta = await apiMP.get('/v1/payments/search', { params });
    return res.status(200).json(resposta.data.results);
  } catch (err) {
    console.error('Erro ao buscar pendentes:', err);
    return res.status(500).json({ error: err.message });
  }
}
import * as mpService from '../backend/src/services/mercadoPagoService.js';

export default async function handler(req, res) {
  console.log('--- Nova requisição recebida ---');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Body:', req.body);
  console.log('Query:', req.query);

  if (req.method === 'GET' && req.url.includes('/pendentes')) {
    return await getPendentes(req, res);
  }
  if (req.method === 'POST') {
    try {
      
      const pagamento = await mpService.criarPagamento(req.body);
      console.log('Pagamento criado:', pagamento);
      return res.status(201).json(pagamento);
      
    } catch (err) {
      
      console.error('Erro ao criar pagamento:', err);
      return res.status(500).json({ error: err.message });
      
    }
  }
  if (req.method === 'GET') {
    try {
      
      const id = req.query.id || req.query.idPagamento || req.url.split('/').pop();
      console.log('Consulta pagamento ID:', id);
      const pagamento = await mpService.consultarPagamento(id);
      
      if (!pagamento || pagamento.status === undefined) {
        
        return res.status(200).json({ status: 'pending' });
        
      }
      console.log('Pagamento consultado:', pagamento);
      return res.status(200).json(pagamento);
      
    } catch (err) {
      
      console.error('Erro ao consultar pagamento:', err);
      return res.status(200).json({ status: 'pending' });
      
    }
  }
  if (req.method === 'PUT') {
    try {
      
      const id = req.query.id || req.query.idPagamento || req.url.split('/').pop();
      console.log('Cancelamento pagamento ID:', id);
      
      const pagamento = await mpService.cancelarPagamento(id);
      console.log('Pagamento cancelado:', pagamento);
      
      return res.status(200).json(pagamento);
      
    } catch (err) {
      
      console.error('Erro ao cancelar pagamento:', err);
      return res.status(500).json({ error: err.message });
      
    }
  }
  
  console.warn('Método não permitido:', req.method);
  return res.status(405).json({ error: 'Method Not Allowed' });
}
