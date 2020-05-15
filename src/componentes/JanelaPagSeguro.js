import React, {useContext} from 'react';
import Iframe from 'react-iframe';
import LojaContext from '../contextos/LojaContext';
import '../App.css';

function JanelaPagSeguro() {
  const {mostraPagSeguro, codigoCheckout} = useContext(LojaContext);

  return (
    <div className={mostraPagSeguro ? "overlay-bg" : "escondido"}>
      <Iframe url={codigoCheckout ? ("https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + codigoCheckout) : ""}
        className="overlay">
      </Iframe>
    </div>
  );
}

export default JanelaPagSeguro;