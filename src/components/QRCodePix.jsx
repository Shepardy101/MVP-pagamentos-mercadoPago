import React from 'react';

function QRCodePix({ url, base64, code }) {
  if (!url) return null;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      alert('Código PIX copiado com sucesso!');
    } catch (err) {
      alert('Erro ao copiar código.');
    }
  }

  return (
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {base64 ? (
        <>
          <img
            src={`data:image/png;base64,${base64}`}
            alt="QR Code PIX"
            style={{ width: 250, height: 250, border: '1px solid #ddd', borderRadius: 8 }}
          />
          <div style={{ width: '100%', maxWidth: 320 }}>
            <p style={{ fontSize: 14, marginBottom: 8 }}>Ou use o código Copia e Cola:</p>
            <div style={{
              display: 'flex',
              gap: 8,
              background: '#222',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              alignItems: 'center'
            }}>
              <input
                readOnly
                value={code}
                style={{
                  flex: 1,
                  border: 'none',
                  background: '#222',
                  color: '#fff',
                  fontSize: 13,
                  padding: '6px 4px',
                  borderRadius: 4
                }}
              />
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 16px',
                  fontSize: 12,
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  marginTop: 0
                }}
              >
                Copiar
              </button>
            </div>
                {/* Botão para voltar à tela inicial */}
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    marginTop: 24,
                    padding: '10px 28px',
                    fontSize: 15,
                    borderRadius: 8,
                    border: '1px solid var(--primary-color)',
                    background: 'white',
                    color: 'var(--primary-color)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Voltar para o início
                </button>
          </div>
        </>
      ) : (
        <p>Acesse o link abaixo para visualizar seu pagamento:</p>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--text-primary)',
          textDecoration: 'none',
          fontWeight: 'bold',
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          marginTop: 8,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
      >
        {base64 ? 'Ver página oficial de pagamento' : 'Abrir Boleto / Pagamento'}
      </a>

      {/* iframe removido para evitar SecurityError de Cross-Origin */}
    </div>
  );
}

export default QRCodePix;
