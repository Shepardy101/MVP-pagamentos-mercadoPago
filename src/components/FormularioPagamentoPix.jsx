import { useState } from 'react';
import PagadorValidator from '../domain/validators/PagadorValidator';

function FormularioPagamentoPix({ dados, aoAlterar, aoEnviar }) {
  const [erros, setErros] = useState({});

  function aplicarMascaraCPF(valor) {
    const limpo = valor.replace(/\D/g, '');
    return limpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  }

  function handleCPFChange(e) {
    const formatado = aplicarMascaraCPF(e.target.value);
    aoAlterar({
      target: {
        name: 'cpf',
        value: formatado
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Limpa o CPF para validação mas mantém o estado com máscara se desejado
    const dadosParaValidar = { ...dados, cpf: dados.cpf.replace(/\D/g, '') };
    const errosValidados = PagadorValidator.validate(dadosParaValidar);
    setErros(errosValidados);
    if (!Object.values(errosValidados).some(Boolean)) aoEnviar(e);
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto'
    }}>
      <label style={{ gridColumn: 'span 2' }}>
        E-mail:
        <input
          type="email"
          name="email"
          value={dados.email}
          onChange={aoAlterar}
          required
          placeholder="seu@email.com"
        />
        {erros.email && <span className="error-msg">{erros.email}</span>}
      </label>

      <label style={{ gridColumn: 'span 2' }}>
        Nome Completo:
        <input
          type="text"
          name="nome"
          value={dados.nome}
          onChange={aoAlterar}
          required
          placeholder="Como no cartão ou documento"
        />
        {erros.nome && <span className="error-msg">{erros.nome}</span>}
      </label>

      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={dados.cpf}
          onChange={handleCPFChange}
          required
          placeholder="000.000.000-00"
          maxLength={14}
        />
        {erros.cpf && <span className="error-msg">{erros.cpf}</span>}
      </label>

      <label>
        Valor (R$):
        <input
          type="number"
          name="valor"
          step="0.01"
          min="0.01"
          value={dados.valor}
          onChange={aoAlterar}
          required
        />
        {erros.valor && <span className="error-msg">{erros.valor}</span>}
      </label>

      <button type="submit" style={{ gridColumn: 'span 2', marginTop: '8px' }}>
        Finalizar Pagamento
      </button>

      <style>{`
        .error-msg {
          color: #ff4d4d;
          font-size: 11px;
          margin-top: 4px;
          font-weight: 500;
        }
      `}</style>
    </form>
  );
}

export default FormularioPagamentoPix;
