

import {ADVERTS_LOADED, AUTH_LOGIN, AUTH_LOGOUT} from './types';


export const authLogin = () => {
    return {
        type: AUTH_LOGIN,
    }    
};


export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
};


export const advertsLoaded = (adverts) =>{
    return {
        type: ADVERTS_LOADED,
        payload: {
            adverts, 
        }
    }
}
