import React from 'react';

const ListaPagamentos = ({ pagamentos, aoCancelar }) => {
    if (!pagamentos || pagamentos.length === 0) {
        return (
            <div style={{ marginTop: '32px', padding: '20px', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
                <p style={{ margin: 0, textAlign: 'center', fontSize: '0.9rem' }}>Nenhum pagamento pendente encontrado.</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '32px', width: '100%' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Vendas Pendentes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pagamentos.map((pagto) => (
                    <div key={pagto.id} style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>
                                ID: {pagto.id}
                            </p>
                            <p style={{ margin: '4px 0', fontSize: '1.1rem', color: 'var(--primary-color)', fontWeight: 800 }}>
                                R$ {pagto.transaction_amount?.toFixed(2) || '0.00'}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {pagto.date_created ? new Date(pagto.date_created).toLocaleString('pt-BR') : '-'}
                            </p>
                        </div>
                        <button
                            onClick={() => aoCancelar(pagto.id)}
                            style={{
                                background: 'rgba(255, 50, 50, 0.1)',
                                color: '#ff4d4d',
                                border: '1px solid #ff4d4d',
                                padding: '8px 16px',
                                fontSize: '0.8rem',
                                margin: 0,
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaPagamentos;
