import { useState, useEffect } from 'react';
import { paymentMethods } from '../domain/paymentMethods';

/**
 * Hook para gerenciar o processo de criação e monitoramento de um pagamento.
 */
export function usePaymentSession(dadosFormulario) {
    const [metodoSelecionado, setMetodoSelecionado] = useState(() => paymentMethods[0]);
    const [respostaPagamento, setRespostaPagamento] = useState(null);
    const [urlPagamento, setUrlPagamento] = useState('');
    const [instanciaMetodo, setInstanciaMetodo] = useState(null);
    const [pagamentoAprovado, setPagamentoAprovado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const selecionarMetodo = (nome) => {
        const Metodo = paymentMethods.find(m => m.getNome() === nome);
        setMetodoSelecionado(() => Metodo);
    };

    const iniciarPagamento = async (e) => {
        e.preventDefault();
        setCarregando(true);
        try {
            const dadosFormatados = {
                ...dadosFormulario,
                cpf: dadosFormulario.cpf.replace(/\D/g, '')
            };
            const metodo = new metodoSelecionado(dadosFormatados);
            setInstanciaMetodo(metodo);

            const resposta = await metodo.criarPagamento();

            const transactionData = resposta.point_of_interaction?.transaction_data;
            setUrlPagamento(transactionData?.ticket_url || resposta.transaction_details?.external_resource_url || '');

            let respostaFinal = resposta;
            if (transactionData?.qr_code_base64) {
                respostaFinal = {
                    ...resposta,
                    pix_qr_code: transactionData.qr_code,
                    pix_qr_code_base64: transactionData.qr_code_base64
                };
            }
            setRespostaPagamento(respostaFinal);
            return respostaFinal;
        } catch (error) {
            console.error(error);
            alert('Erro ao criar pagamento. Verifique os dados e tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    const verificarStatus = async () => {
        if (!respostaPagamento || !instanciaMetodo || pagamentoAprovado) return;
        try {
            const status = await instanciaMetodo.consultarStatus(respostaPagamento.id);
            if (status === 'approved') {
                setPagamentoAprovado(true);
                if (onApproval) onApproval();
                return true;
            }
        } catch (error) {
            console.error('Erro ao verificar status:', error);
        }
        return false;
    };

    useEffect(() => {
        let intervalo;
        if (respostaPagamento && !pagamentoAprovado) {
            intervalo = setInterval(async () => {
                await verificarStatus();
            }, 5000);
        }
        return () => clearInterval(intervalo);
    }, [respostaPagamento, pagamentoAprovado]);

    return {
        metodoSelecionado,
        selecionarMetodo,
        respostaPagamento,
        urlPagamento,
        pagamentoAprovado,
        carregando,
        iniciarPagamento
    };
}
