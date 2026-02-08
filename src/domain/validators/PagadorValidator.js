// Classe validadora para os dados do pagador
export default class PagadorValidator {
  static validate(dados) {
    const erros = {};
    // E-mail
    if (!dados.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(dados.email)) {
      erros.email = 'E-mail inválido';
    }
    // Nome
    if (!dados.nome || dados.nome.length < 2) {
      erros.nome = 'Nome deve ter pelo menos 2 caracteres';
    }
    // CPF (apenas números, 11 dígitos)
    if (!dados.cpf || !/^\d{11}$/.test(dados.cpf)) {
      erros.cpf = 'CPF deve conter 11 dígitos numéricos';
    } else if (!PagadorValidator.validarCPF(dados.cpf)) {
      erros.cpf = 'CPF inválido';
    }
    // Valor
    if (!dados.valor || Number(dados.valor) < 0.01) {
      erros.valor = 'Valor deve ser no mínimo R$ 0,01';
    }
    return erros;
  }

  // Validação de CPF (algoritmo oficial)
  static validarCPF(cpf) {
    if (!cpf) return false;
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;
    return true;
  }
}
