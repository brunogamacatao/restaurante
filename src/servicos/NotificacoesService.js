import socketIOClient from "socket.io-client";

const REACT_URL_SOCKET_IO = process.env.REACT_APP_URL_SOCKET_IO;
const socket = socketIOClient(REACT_URL_SOCKET_IO);

const onNotificacao = (callback) => {
  socket.on('cozinha', msg => {
    callback(msg);
  });  
};

export default {
  onNotificacao
};
