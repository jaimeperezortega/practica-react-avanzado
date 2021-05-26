

import {ADVERTS_CREATED, ADVERTS_LOADED, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, UI_RESET_ERROR} from './types';

import {login} from '../api/auth';


// export const authLogin = () => {
//     return {
//         type: AUTH_LOGIN,
//     }    
// };

//Dividimos la acción de AUTH_LOGIN en 3 acciones más pequeñas

export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
        
    }    
};

export const authLoginSuccess = () => {
    return {
        type: AUTH_LOGIN_SUCCESS,
    }    
};

export const authLoginFailure = error => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload: error,
        error:true
    }    
};

export const loginAction = (credentials, history, location) =>{ //Esta es la acción que voy a meter en el middleware de thunk. Se trata de una función que devuelve otra función que tiene acceso a los dispatch originales y puede ser asíncrona

    return async function(dispatch, getState){
        dispatch(authLoginRequest());
        try {
          await login(credentials);
          dispatch(authLoginSuccess());
    
          //Redirect
          const { from } = location.state || { from: { pathname: '/' } };
          history.replace(from);
          
        } catch (error) {
          dispatch(authLoginFailure(error))
        }
        
    }

  }


export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
};


export const advertsLoaded = (adverts) =>{
    return {
        type: ADVERTS_LOADED,
        payload: adverts,
        
    }
}


export const advertCreated = advert => {
    return{
        type: ADVERTS_CREATED,
        payload: advert,
              
    
    }
}

export const resetError = () => {
    return {
        type: UI_RESET_ERROR,
    }
}