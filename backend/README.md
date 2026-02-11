# Backend Mercado Pago Proxy

Este backend Node.js serve como proxy seguro para integração com a API do Mercado Pago, evitando problemas de CORS e protegendo o token de acesso.

## Estrutura

- `src/controllers/`: Lógica dos endpoints
- `src/routes/`: Rotas da API
- `src/services/`: Integração com Mercado Pago
- `src/config/`: Configuração de ambiente
- `src/middlewares/`: Tratamento de erros
- `.env`: Token do Mercado Pago

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o token no `.env`:
   ```env
   MP_TOKEN=SEU_ACCESS_TOKEN_AQUI
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

## Endpoints

- `POST /api/payments` — Cria pagamento
- `GET /api/payments/:id` — Consulta pagamento
- `PUT /api/payments/:id` — Cancela pagamento

## Deploy

Pronto para Vercel, Render, Heroku ou qualquer serviço Node.js.

---
Desenvolvido para integração segura com Mercado Pago.
