import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mercadopago.com',
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TOKEN_MERCADO_PAGO_PUBLIC;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function criarPagamentoPix(dadosFormulario) {
  const dados = {
    transaction_amount: 1,
    description: 'Produto teste de desenvolvimento',
    payment_method_id: 'pix',
    payer: {
      email: dadosFormulario.email,
      first_name: dadosFormulario.nome,
      last_name: '',
      identification: {
        type: 'CPF',
        number: dadosFormulario.cpf,
      },
    },
  };
  const resposta = await api.post('v1/payments', dados);
  return resposta.data;
}

export async function consultarStatusPagamento(idPagamento) {
  const resposta = await api.get(`v1/payments/${idPagamento}`);
  return resposta.data.status;
}
