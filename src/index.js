import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';
import configureStore from './store';
import {Provider} from 'react-redux';
import Root from './Root';

const accessToken = storage.get('auth');
configureClient({ accessToken });

 export const store = configureStore({preloadedState: {auth:!!accessToken, adverts:[]}}) //Creamos el store llamando a la función configureStore que hemos creado previamente en el index.js de la carpeta store y esta función nos permite pasarle un  objeto de configuración como preloadedState. De esta forma podemos pasar como estado inicial de isLOgged en función de lo que nos devuelva la llamada a la función de arriba (configureClient) e iniciamos el estado de islogged a true o false dependiendo de si tenemos o no token en el localStorage. Si no tuvieramos accesom a esta info, lo más razonable sería inicial,izar el estado a false. En este caso estamos pasando como valor de auth el booleano de accessToken (es decir, si hay accessToken será true y si no será false)

// console.log(store);
// console.log('Estado inicial con el preloadedState', store.getState())
// store.dispatch(authLogin());
// console.log('Estado después del dispatch authLogin', store.getState())
// store.dispatch(authLogout());
// console.log('Estado después del dispatch authLogout', store.getState())


// Ya podríamos sustituir el estado de isLogged definido en App.js por el estado que tenemos fuardado en el store

//1. Pasamos el store por props a mi componente App
// 2. En App recibimos por props el componente store
// 3. los manejadores del evento utilizan el dispatch de login o logout para cambiar el estado 
// 4. Cambiamos el valor isLogged de las authProps a lo que me devuelva el metodo getState().auth del store 



ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);
