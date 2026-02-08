import PaymentMethod from './PaymentMethod';
import api from '../../infra/mercadoPagoApi';

export default class PixPayment extends PaymentMethod {
  static getNome() {
    return 'PIX';
  }

  async criarPagamento() {
    const dados = {
      transaction_amount: Number(this.dados.valor),
      description: 'Produto teste de desenvolvimento',
      payment_method_id: 'pix',
      payer: {
        email: this.dados.email,
        first_name: this.dados.nome,
        last_name: '',
        identification: {
          type: 'CPF',
          number: this.dados.cpf,
        },
      },
    };
    const resposta = await api.post('v1/payments', dados);
    return resposta.data;
  }

  async consultarStatus(idPagamento) {
    const resposta = await api.get(`v1/payments/${idPagamento}`);
    return resposta.data.status;
  }
}
