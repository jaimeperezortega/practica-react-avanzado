

import { getAdvertsLoaded, getTagsLoaded } from './selectors';
import {ADVERTS_CREATED, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, UI_RESET_ERROR, ADVERTS_LOADED_FAILURE, ADVERTS_LOADED_SUCCESS, ADVERTS_LOADED_REQUEST, TAGS_LOADED_REQUEST, TAGS_LOADED_SUCCESS, TAGS_LOADED_FAILURE, ADVERTS_CREATED_SUCCESS, ADVERTS_CREATED_REQUEST, ADVERTS_CREATED_FAILURE} from './types';

//import {login} from '../api/auth';


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

    return async function(dispatch, getState, {api}){// El middleware de thunk permite pasar como tercer argumento en este caso el objeto api para que yo no tenga que importar el método login desde api/auth ya que HAY QUE INTENTAR INYECTAR EL MAYOR NÚMERO DE COSAS A TRAVÉS DE LOS ARGUMENTOS DE LAS FUNCIONES Y NO HACIENDO IMPORTS
        dispatch(authLoginRequest());
        
        try {
          await api.auth.login(credentials);
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


export const advertsLoadedSuccess = (adverts) =>{
    return {
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts,
    }
        
}

export const advertsLoadedRequest = () =>{
    return {
        type: ADVERTS_LOADED_REQUEST,
        
    }
        
}

export const advertsLoadedFailure = (error) =>{
    return {
        type: ADVERTS_LOADED_FAILURE,
        payload: error,
        error: true,
    }
        
}

export const advertsLoadedAction = () =>{
    return async function (dispatch, getState, {api}){
        const advertsAlreadyLoaded = getAdvertsLoaded(getState());
        if (advertsAlreadyLoaded) {
            return // si los adverts ya están cargados en el store de redux, no llamar a la API
        }
        dispatch(advertsLoadedRequest())
        try {
            const adverts = await api.adverts.getAdverts();
            dispatch(advertsLoadedSuccess(adverts))
        } catch (error) {
            dispatch(advertsLoadedFailure(error))
        }
    }
}

export const tagsLoadedRequest = () =>{
    return {
        type: TAGS_LOADED_REQUEST,
        
    }
}

export const tagsLoadedSuccess = (tags) =>{
    return{
        type:TAGS_LOADED_SUCCESS,
        payload: tags
    }
};

export const tagsLoadedFailure = error =>{
    return{
        type: TAGS_LOADED_FAILURE,
        payload: error,
        error:true,
    }
}



export const tagsLoadedAction = () =>{
    return async function (dispatch, getState, {api}){
        const tagsAlreadyLoaded = getTagsLoaded(getState());
        if (tagsAlreadyLoaded) {
            return // si los tags ya están cargados en el store de redux, no llamar a la API
        }
        dispatch(tagsLoadedRequest())
        try {
            const tags = await api.adverts.getTags();
            dispatch(tagsLoadedSuccess(tags))
        } catch (error) {
            dispatch(tagsLoadedFailure(error))
        }
    }
}

// export const advertCreated = advert => {
//     return{
//         type: ADVERTS_CREATED,
//         payload: advert,
              
    
//     }
// }

export const advertCreatedSuccess = (advert) =>{
    return {
        type: ADVERTS_CREATED_SUCCESS,
        payload: advert,
    }
        
}

export const advertCreatedRequest = () =>{
    return {
        type: ADVERTS_CREATED_REQUEST,
        
    }
        
}

export const advertCreatedFailure = (error) =>{
    return {
        type: ADVERTS_CREATED_FAILURE,
        payload: error,
        error: true,
    }
        
}

export const advertCreatedAction = advert =>{
    return async function (dispatch, getState, {api}){
        
        dispatch(advertCreatedRequest())
        try {
            const advertCreated = await api.adverts.createAdvert(advert);
            dispatch(advertCreatedSuccess(advertCreated));
            return advertCreated;
        } catch (error) {
            dispatch(advertCreatedFailure(error))
        }
    }
}

export const resetError = () => {
    return {
        type: UI_RESET_ERROR,
    }
}