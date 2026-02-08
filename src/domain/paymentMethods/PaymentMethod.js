// Classe base para métodos de pagamento
export default class PaymentMethod {
  constructor(dados) {
    this.dados = dados;
  }

  async criarPagamento() {
    throw new Error('Método criarPagamento() deve ser implementado.');
  }

  async consultarStatus(idPagamento) {
    throw new Error('Método consultarStatus() deve ser implementado.');
  }

  static getNome() {
    return 'Método de Pagamento Genérico';
  }
}
