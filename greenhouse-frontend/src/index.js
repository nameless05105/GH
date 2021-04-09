import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { checkLoggedIn } from "./util/session";
import io from 'socket.io-client';

// const socket = io(
//   window.location.protocol + '//' + window.location.hostname + ':8090'
// );

const socket = io.connect("https://smart-glow.ru");

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);

  socket.on('UPDATE_MODULES', state =>{
    store.dispatch({type: 'UPDATE_MODULE_DATA', state});
    }
  );

  socket.on('UPDATE_MODULES_FOR_DATE', state =>{
    store.dispatch({type: 'UPDATE_MODULES_FOR_DATE', state});
    }
  );

  
  socket.on('REQUESTDATA', state =>{
    }
  );

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

export function sendData(store, message, id_uuid) {
  socket.emit('sendData',store, message);
  // console.log(store, message)
}

(async () => renderApp(await checkLoggedIn()))();