import React, {useState, useContext} from 'react';
import '../App.css';
import Overlay from '../componentes/Overlay';
import JanelaPagSeguro from '../componentes/JanelaPagSeguro';
import StatusPedido from '../entidades/StatusPedido';
import LojaContext from '../contextos/LojaContext';

function CarrinhoDeCompras() {
  const [escondido, setEscondido] = useState(true);

  const {pedidos, cancelarPedido, finalizarCompra} = useContext(LojaContext);
  const {setMostraOverlay, setTextoOverlay} = useContext(LojaContext);
  const {setMostraPagSeguro, setCodigoCheckout} = useContext(LojaContext);

  const calculaTotal = () => {
    let total = 0.0;
    pedidos.forEach(p => total += p.valor);
    return total;
  };

  const renderPedido = (pedido, indice) => {
    return (
      <tr key={"pedido_" + indice}>
        <td><img src={pedido.foto} alt="Foto do pedido"/></td>
        <td>{pedido.nome}</td>
        <td>{pedido.tipo}</td>
        <td>R$ {pedido.valor.toFixed(2)}</td>
        <td>{pedido.status}</td>
        <td>
          { pedido.status === StatusPedido.NA_FILA ?  (
            <button className="myButton" onClick={() => cancelarPedido(indice)}>
              Cancelar
            </button>
          ) : (
            <span>-</span>
          )}
        </td>
      </tr>
    );
  };

  const toggleEscondido = () => {
    setEscondido(!escondido);
  };

  const exibeMensagem = (texto) => {
    setTextoOverlay(texto);
    setMostraOverlay(true);
  };

  return (
    <>
      <JanelaPagSeguro/>
      <Overlay/>
      <div className="table-cardapio">
        <div className="header" onClick={() => toggleEscondido()}>
          Pedidos -&nbsp;
          <span role="img" aria-label="saco de dinheiro">💰</span>&nbsp;
          R$ {calculaTotal().toFixed(2)}&nbsp;
          <span className="seta">
            {escondido ? "🡣" : "🡡"}
          </span>
        </div>
        <table cellSpacing="0" className={escondido ? "escondido" : ""}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(renderPedido)}
          </tbody>
        </table>
        <div className={escondido ? "escondido" : "centro"}>
          <button className="myButton" onClick={() => {
            exibeMensagem("Processando o pagamento ...");
            finalizarCompra().then(dados => {
              setCodigoCheckout(dados.checkout.code);
              setMostraOverlay(false);
              setMostraPagSeguro(true);
            });
          }}>
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </>
  );
};

export default CarrinhoDeCompras;
