import axios from 'axios';

const URL_BACKEND = 'http://localhost:5000/pedidos';

const finalizarPedido = async (pedidos) => {
  const idsDosPedidos = pedidos.map(p => p.id);
  return (await axios.post(URL_BACKEND, idsDosPedidos)).data;
};

export default {
  finalizarPedido
};