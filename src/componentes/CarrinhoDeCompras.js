import React, {useState, useContext} from 'react';
import '../App.css';
import Overlay from '../componentes/Overlay';
import JanelaPagSeguro from '../componentes/JanelaPagSeguro';
import StatusPedido from '../entidades/StatusPedido';
import LojaContext from '../contextos/LojaContext';

function CarrinhoDeCompras() {
  const [escondido, setEscondido] = useState(true);
  const {loja, overlay, pagSeguro} = useContext(LojaContext);

  const calculaTotal = () => {
    let total = 0.0;
    loja.pedidos.forEach(p => total += p.valor);
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
            <button className="myButton" onClick={() => loja.cancelarPedido(indice)}>
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
    overlay.setTexto(texto);
    overlay.setMostra(true);
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
            {loja.pedidos.map(renderPedido)}
          </tbody>
        </table>
        <div className={escondido ? "escondido" : "centro"}>
          <button className="myButton" onClick={() => {
            exibeMensagem("Processando o pagamento ...");
            loja.finalizarCompra().then(dados => {
              overlay.setMostra(false);
              pagSeguro.setCodigoCheckout(dados.checkout.code);
              pagSeguro.setMostra(true);
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
