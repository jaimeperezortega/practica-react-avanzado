 

 import {createStore, combineReducers, applyMiddleware} from 'redux'; //La función createStore admite un segundo parámetro (preloadedState) que no es el estado por defecto pero sí que sirve para inicializar un estado a un valor determinado cuando definamos el estado. No es lo mismo que el valor por defecto. Si al inicializar un estado especificas que su valor es este preloadedstate, sobreescribirá a su valor por defecto porque sí que estás especificando un valor al inicializarlo...

 import * as reducers from './reducers';

 import { composeWithDevTools } from 'redux-devtools-extension';
 import thunk from 'redux-thunk';
import * as auth from '../api/auth'
import * as adverts from '../api/adverts'

const api = {auth, adverts}
console.log(api)

const middleware = [thunk.withExtraArgument({api})]; // El orden en que defina los middlewares en los arrays es muy importante. La primera capa suele ser el thunk

 const configureStore = ({preloadedState}) => {
    const store = createStore(combineReducers
        (reducers),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middleware)));

     return store
 }

 //Creamos esta función de configureStore para que lo que exportemos posteriormente sea el store pero que permita recibir un objeto de configuración que será el preloadedState para inicializar el estado de mi componente a una configuración determinada y que no sea un undefined

 export default configureStore;


