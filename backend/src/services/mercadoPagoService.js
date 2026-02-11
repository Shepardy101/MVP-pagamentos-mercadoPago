import axios from 'axios';
import { MP_TOKEN } from '../config/env.js';

const api = axios.create({
  baseURL: 'https://api.mercadopago.com',
  headers: {
    Authorization: `Bearer ${MP_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const criarPagamento = async (dados) => {
  const res = await api.post('/v1/payments', dados);
  return res.data;
};

export const consultarPagamento = async (id) => {
  const res = await api.get(`/v1/payments/${id}`);
  return res.data;
};

export const cancelarPagamento = async (id) => {
  const res = await api.put(`/v1/payments/${id}`, { status: 'cancelled' });
  return res.data;
};
