import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';
import configureStore from './store';
import {authLogin, authLogout} from './store/actions'

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({preloadedState: {auth:!!accessToken}}) //Creamos el store llamando a la función configureStore que hemos creado previamente en el index.js de la carpeta store y esta función nos permite pasarle un  objeto de configuración como preloadedState. De esta forma podemos pasar como estado inicial de isLOgged en función de lo que nos devuelva la llamada a la función de arriba (configureClient) e iniciamos el estado de islogged a true o false dependiendo de si tenemos o no token en el localStorage. Si no tuvieramos accesom a esta info, lo más razonable sería inicial,izar el estado a false. En este caso estamos pasando como valor de auth el booleano de accessToken (es decir, si hay accessToken será true y si no será false)



// console.log(store);
// console.log('Estado inicial con el preloadedState', store.getState())
// store.dispatch(authLogin());
// console.log('Estado después del dispatch authLogin', store.getState())
// store.dispatch(authLogout());
// console.log('Estado después del dispatch authLogout', store.getState())



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App isInitiallyLogged={!!accessToken} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
