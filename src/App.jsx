import { useState } from 'react';
import './App.css';
import FormularioPagamentoPix from './components/FormularioPagamentoPix';
import StatusPagamentoPix from './components/StatusPagamentoPix';
import QRCodePix from './components/QRCodePix';
import ListaPagamentos from './components/ListaPagamentos';
import { paymentMethods } from './domain/paymentMethods';
import { usePaymentSession } from './hooks/usePaymentSession';
import { useRecentPayments } from './hooks/useRecentPayments';

function App() {
  const [dadosFormulario, setDadosFormulario] = useState({
    email: '',
    nome: '',
    cpf: '',
    valor: '',
  });

  const {
    pagamentosPendentes,
    cancelarPagamento,
    carregarPendencias
  } = useRecentPayments();

  const {
    metodoSelecionado,
    selecionarMetodo,
    respostaPagamento,
    urlPagamento,
    pagamentoAprovado,
    iniciarPagamento
  } = usePaymentSession(dadosFormulario, carregarPendencias);

  function aoAlterarCampo(evento) {
    const { name, value } = evento.target;
    setDadosFormulario((dados) => ({ ...dados, [name]: value }));
  }

  const handleEnviar = async (e) => {
    const sucesso = await iniciarPagamento(e);
    if (sucesso) carregarPendencias();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Checkout Inteligente</h2>
        <p>Preencha os dados e escolha o método de pagamento.</p>

        {!respostaPagamento && (
          <div className="payment-selector" style={{ marginBottom: 24 }}>
            <label>Método de Pagamento</label>
            <select
              style={{ width: '100%' }}
              onChange={(e) => selecionarMetodo(e.target.value)}
              value={metodoSelecionado.getNome()}
            >
              {paymentMethods.map((Metodo, idx) => (
                <option key={idx} value={Metodo.getNome()}>{Metodo.getNome()}</option>
              ))}
            </select>
          </div>
        )}

        {!respostaPagamento && (
          <FormularioPagamentoPix
            dados={dadosFormulario}
            aoAlterar={aoAlterarCampo}
            aoEnviar={handleEnviar}
          />
        )}

        {respostaPagamento && !pagamentoAprovado && (
          <div className="payment-status-container">
            <StatusPagamentoPix />
          </div>
        )}

        {urlPagamento && !pagamentoAprovado && (
          <QRCodePix
            url={urlPagamento}
            base64={respostaPagamento?.pix_qr_code_base64}
            code={respostaPagamento?.pix_qr_code}
          />
        )}

        {respostaPagamento && !pagamentoAprovado && !urlPagamento && (
          <p className="status-note">Pagamento criado. Aguardando processamento...</p>
        )}

        {pagamentoAprovado && (
          <div className="success-message">
            <h1 style={{ color: 'var(--primary-color)' }}>Pagamento Aprovado!</h1>
            <p>Obrigado pela sua compra. Seu acesso foi liberado.</p>
          </div>
        )}

        {!respostaPagamento && (
          <ListaPagamentos
            pagamentos={pagamentosPendentes}
            aoCancelar={cancelarPagamento}
          />
        )}
      </header>
    </div>
  );
}

export default App;
