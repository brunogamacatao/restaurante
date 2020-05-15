import axios from 'axios';

const URL_BACKEND = process.env.REACT_APP_PEDIDOS_BACKEND;

const finalizarPedido = async (pedidos) => {
  const idsDosPedidos = pedidos.map(p => p.id);
  return (await axios.post(URL_BACKEND, idsDosPedidos)).data;
};

export default {
  finalizarPedido
};