import React, {useContext} from 'react';
import '../App.css';
import LojaContext from '../contextos/LojaContext';

function Cardapio() {
  const {produtos, pedir} = useContext(LojaContext);

  const renderProduto = (produto) => {
    return (
      <tr key={"produto_" + produto._id}>
        <td><img alt="Foto do produto" src={produto.foto}/></td>
        <td>{produto.nome}</td>
        <td>{produto.tipo}</td>
        <td>R$ {produto.valor.toFixed(2)}</td>
        <td><button className="myButton" onClick={() => pedir(produto)}>Pedir</button></td>
      </tr>
    );
  };

  return (
    <div className="table-cardapio">
      <div className="header">Cardápio</div>
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Preço</th>
            <th>Pedir</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(renderProduto)}
        </tbody>
      </table>
    </div>
  );
};

export default Cardapio;