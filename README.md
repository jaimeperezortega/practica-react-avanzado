# PRÁCTICA DE REACT AVANZADO

- Instalar Redux: npm install redux


## REDUX DEVTOOLS

### INSTALACIÓN 1:


    - https://extension.remotedev.io/
    - Añadir como tercer parámetro a la función de create store este comando:          
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    QUEDA LA FUNCIÓN ASÍ:
    
    const store = createStore(
        reducer,
         preloadedState,
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
         );

### INSTALACIÓN 2:
CON EL PAQUETE REDUX-DEVTOOLS-EXTENSION

    1. INSTALAR: npm install --save-dev redux-devtools-extension

    2.  SEGUIR INSTRUCCIIONES:

    and to use like so:

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any
));


## REACT REDUX

Librería que permite conectar los componentes de React con redux: npm install -- save react-redux

Esta librería tiene disponible los siguientes elementos: 

1. El componente </Provider/> que va a ser al que le vamos a pasar el store y lo va a poner en un contexto de React para que todos los componentes que lo necesiten tengan acceso al store. Funciona muy parecido al componente Router de React Router. Hay que ponerlo envolviendo 

2. La función connect() a la que le voy a pasar un primer objeto de configuracón y al resultado de eso le voy a pasar mi componente. Connect es un high order component que crea componentes conectados con el store de redux: export defaault connect(mapStateToProps, mapDispatchToProps)(TodoList). mapStateToProps extrae datos del estado y mapDispatchToProps crea funciones que despachan acciones.

## REACT REDUX HOOKS (ALTERNATIVA A CONNECT)

1. useSelector --> Permite extraer datos de un store de redux, usando un selector (const result = useSelector(selector)). Ssustituye a uusar el connect con el mapStateToProps

2. useDispatch --> devuelve el dispatch

3. useStore




## REACT MIDDLEWARES 

Sin middlewares, podemos manejar las acciones que sean objetos. Los middlewares, nos van a permitir manejar otro tipo de acciones. Voy a poder despachar promesas, funciones... El middleware más conocido es redux thunk

Nos van a ayudar a traernos la lógica de una llamada a un login, una api, etc a redux y dejar componentes "tontos". Para meter acciones asíncronas, podemos meter una capa extra (middleware) que es quien va a manejar ese tipo de acciones asíncronas. Cuando hacemos una llamada a una APi identificamos varios momentos en la vida de esa llamada:

1. Momento de iniciar la petición {type: FETCH_REQUEST} // isLoading:true, error:null
2. Momento en que la petición finaliza con ñexito {type: FETCH_SUCCESS, result: [...]} // isLoading:false, error:null
3. Momento en que la petición falla y hay que gestionarl el error {type: FETCH_FAILURE, error: 'Error fetching data'} // isLoading: false, error:error


### REDUX thunk

es una capa que va a rodear a nuestro dispatch de tal manera que cuando hagamos un dispatch contra redux, no estaremos llamando al dispatch original, sino que por debajo mi acción va a pasar por un bloque de código que va a interceptar esa acción. El dispatch original solo puede despachar acciones síncronas.

¿Cómo se despachan acciones en un componente?

1. (Lo que estábamos haciendo hasta ahora) EMITIMOS ACCIONES DIRECTAMENTE EN EL COMPONENTE
2. REDUX THINK MIDDLEWARE ( Es la opción más limpia)

    - Action creator puede devolver una función (thunk)
    - La funcion es ejecutada por el middleware
    - El thunk tiene acceso al estado

Pasos para poder utilizarlo:

1. Importar redux-middleware (import {applyMiddleware} from 'redux')
2- Configurar el store para que admita middleware. En composewithDevTools pasar como argumento applyMiddleware e indicar todos los middlewares que vamos a usar
3- Instalamos thunk middleware


## TESTING

npm run test

Escribiremos tests unitarios mediante jest.

Excepto en las acciones asíncronas, no tendremos necesidad de mocks de funciones


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
