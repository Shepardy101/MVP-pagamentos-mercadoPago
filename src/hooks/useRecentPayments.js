import { useState, useEffect, useCallback } from 'react';
import { buscarPagamentosPendentes, cancelarPagamento as mpCancelarPagamento } from '../infra/mercadoPagoApi';

/**
 * Hook para gerenciar a lista de pagamentos pendentes e ações de cancelamento.
 */
export function useRecentPayments(cpf) {
    const [pagamentosPendentes, setPagamentosPendentes] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const carregarPendencias = useCallback(async () => {
        setCarregando(true);
        try {
            const resultados = await buscarPagamentosPendentes(cpf);
            setPagamentosPendentes(resultados || []);
        } catch (error) {
            console.error('Erro ao carregar pendências:', error);
        } finally {
            setCarregando(false);
        }
    }, [cpf]);

    const cancelarPagamento = async (id) => {
        if (!window.confirm('Deseja realmente cancelar este pagamento?')) return false;
        try {
            await mpCancelarPagamento(id);
            await carregarPendencias();
            return true;
        } catch (error) {
            alert('Erro ao cancelar pagamento.');
            return false;
        }
    };

    useEffect(() => {
        carregarPendencias();
    }, [carregarPendencias]);

    return {
        pagamentosPendentes,
        carregando,
        carregarPendencias,
        cancelarPagamento
    };
}
