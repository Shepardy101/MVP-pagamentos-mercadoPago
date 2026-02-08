import React from 'react';

function StatusPagamentoPix() {
  return (
    <div style={{ margin: '24px 0', textAlign: 'center' }}>
      <div className="loader-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div className="spinner" style={{
          width: 20,
          height: 20,
          border: '3px solid rgba(255,255,255,0.1)',
          borderTop: '3px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Verificando pagamento automaticamente...
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default StatusPagamentoPix;
