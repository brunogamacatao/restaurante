import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const URL_BACKEND = process.env.REACT_APP_URL_BACKEND;

const carregarProdutos = () => {
  console.log('URL_BACKEND', URL_BACKEND);
  return new Promise((resolve, reject) => {
    ajax(URL_BACKEND).pipe(
      map(ajaxResponse => ajaxResponse.response)
    ).subscribe(produtos => {
      resolve(produtos);
    });
  });
};

export default {
  carregarProdutos
};