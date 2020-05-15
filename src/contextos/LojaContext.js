import React, {useState, useEffect} from 'react';
import Pedido from '../entidades/Pedido';
import StatusPedido from '../entidades/StatusPedido';
import ProdutosService from '../servicos/ProdutosService';
import PedidosService from '../servicos/PedidosService';

const LojaContext = React.createContext();

export const LojaProvider = ({children}) => {
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const [mostraOverlay, setMostraOverlay] = useState(false);
  const [textoOverlay, setTextoOverlay] = useState('');
  const [mostraPagSeguro, setMostraPagSeguro] = useState(false);
  const [codigoCheckout, setCodigoCheckout] = useState(null);

  // quando o componente for carregado
  useEffect(() => {
    ProdutosService.carregarProdutos().then(setProdutos);
  }, []);

  const pedir = (produto) => {
    // converte produto em pedido - define o status do pedido como 'na fila'
    let pedido = new Pedido(
      produto._id, 
      produto.nome, 
      produto.valor, 
      produto.tipo, 
      produto.foto, 
      StatusPedido.NA_FILA);

    setPedidos([...pedidos, pedido]);
  };

  const cancelarPedido = (indice) => {
    setPedidos([...pedidos.slice(0, indice), ...pedidos.slice(indice + 1)]);
  };

  const finalizarCompra = async () => {
    return await PedidosService.finalizarPedido(pedidos);
  };

  return (
    <LojaContext.Provider value={{
      produtos, pedidos, pedir, cancelarPedido, finalizarCompra,
      mostraOverlay, setMostraOverlay, textoOverlay, setTextoOverlay,
      mostraPagSeguro, setMostraPagSeguro, codigoCheckout, setCodigoCheckout
    }}>
      {children}
    </LojaContext.Provider>
  );  
};

export default LojaContext;