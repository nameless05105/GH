import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { checkLoggedIn } from "./util/session";
import io from 'socket.io-client';

const socket = io(
  window.location.protocol + '//' + window.location.hostname + ':8090'
);


// const saveState = (state) => {
//   try {
//       // Convert the state to a JSON string 
//       const serialisedState = JSON.stringify(state);

//       // Save the serialised state to localStorage against the key 'app_state'
//       window.localStorage.setItem('app_state', serialisedState);
//   } catch (err) {
//       // Log errors here, or ignore
//   }
// };

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);

  // store.subscribe(() => {
  //   saveState(store.getState());
  // });
  

  socket.on('UPDATE_DEVICE_DATA', state =>{
  store.dispatch({type: 'UPDATE_DEVICE_DATA', state});
  console.log(store.getState())}
  );
  socket.on('UPDATE_GROUP_DATA', state =>{
    store.dispatch({type: 'UPDATE_GROUP_DATA', state});
    console.log(store.getState())}
  );
  socket.on('UPDATE_PROGRAM_DATA', state =>
    store.dispatch({type: 'UPDATE_PROGRAM_DATA', state})
  );
  socket.on('UPDATE_CHART_DATA', state =>
    store.dispatch({type: 'UPDATE_CHART_DATA', state})
  );
  socket.on('UPDATE_SENSOR_DATA', state =>
    store.dispatch({type: 'UPDATE_SENSOR_DATA', state})
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
  console.log(store, message)
}


(async () => renderApp(await checkLoggedIn()))();