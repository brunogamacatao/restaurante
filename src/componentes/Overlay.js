import React, {useContext} from 'react';
import LojaContext from '../contextos/LojaContext';
import '../App.css';

function Overlay() {
  const {overlay} = useContext(LojaContext);

  return (
    <div className={overlay.mostra ? "overlay-bg" : "escondido"}>
      <div className="overlay">
        <div className="centralizado">
          <h1>{overlay.texto}</h1>
        </div>
      </div>
    </div>
  );
}

export default Overlay;