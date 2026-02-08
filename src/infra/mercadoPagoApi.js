import axios from 'axios';

const api = axios.create({
  baseURL: '/mp-api',
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TOKEN_MERCADO_PAGO_PUBLIC;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function buscarPagamentosPendentes() {
  const resposta = await api.get('v1/payments/search', {
    params: {
      status: 'pending',
      sort: 'date_created',
      criteria: 'desc',
      limit: 10
    }
  });
  return resposta.data.results;
}

export async function cancelarPagamento(id) {
  const resposta = await api.put(`v1/payments/${id}`, {
    status: 'cancelled'
  });
  return resposta.data;
}

export default api;
