import axios from 'axios';

const isDev = import.meta.env.MODE === 'development';
const api = axios.create({
  baseURL: isDev ? '/mp-api' : '/api/payments',
});



  // Exemplo: buscar pagamentos pendentes (ajuste conforme backend)
  // O backend pode precisar de um endpoint específico para listar pendentes
  // Aqui, apenas um placeholder:
  // O backend não implementa busca de pendentes, então retorna vazio
  return [];
}

  const resposta = await api.put(`/${id}`);
  return resposta.data;
}

export default api;
  return resposta.data;
