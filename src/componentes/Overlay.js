import React, {useContext} from 'react';
import LojaContext from '../contextos/LojaContext';
import '../App.css';

function Overlay() {
  const {mostraOverlay, textoOverlay} = useContext(LojaContext);

  return (
    <div className={mostraOverlay ? "overlay-bg" : "escondido"}>
      <div className="overlay">
        <div className="centralizado">
          <h1>{textoOverlay}</h1>
        </div>
      </div>
    </div>
  );
}

export default Overlay;