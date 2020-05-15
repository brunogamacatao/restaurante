import React, {useContext} from 'react';
import LojaContext from '../contextos/LojaContext';
import '../App.css';

const URL_CHECKOUT = process.env.REACT_APP_URL_CHECKOUT_PAGSEGURO;

function JanelaPagSeguro() {
  const {pagSeguro} = useContext(LojaContext);

  return (
    <div className={pagSeguro.mostra ? "overlay-bg" : "escondido"}>
      <iframe 
        title="Checkout PagSeguro"
        src={pagSeguro.codigoCheckout ? (URL_CHECKOUT + pagSeguro.codigoCheckout) : ""}
        className="overlay loading">
      </iframe>
    </div>
  );
}

export default JanelaPagSeguro;