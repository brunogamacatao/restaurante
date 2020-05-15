import React from 'react';
import './App.css';
import Cardapio from './componentes/Cardapio';
import CarrinhoDeCompras from './componentes/CarrinhoDeCompras';
import {LojaProvider} from './contextos/LojaContext';

function App() {
  return (
    <LojaProvider>
      <CarrinhoDeCompras/>
      <Cardapio/>
    </LojaProvider>
  );  
}

export default App;
