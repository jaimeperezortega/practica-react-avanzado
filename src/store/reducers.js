
import {ADVERTS_CREATED, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_REQUEST, AUTH_LOGOUT, UI_RESET_ERROR, ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCCESS, TAGS_LOADED_REQUEST, TAGS_LOADED_SUCCESS, ADVERTS_CREATED_REQUEST, ADVERTS_CREATED_SUCCESS, DELETE_ADVERT_SUCCESS} from './types';
import {combineReducers} from 'redux';

export const initialState = {
    auth: false,
    adverts: {
        loaded: false,
        data: [],
            },
    ui:{
        loading: false,
        error: null,
    },
    tags: {
        loaded:false,
        data:[],
    }
}


// Redux permite combinar distintos reducers en uno solo de tal forma que cada reducer maneje una perte concreta del estado. En Este caso, tenemos un reducer que maneja solo el estado auth a true o false pero cuando ncesirtemos manejar más estados, tendremos que crear más reducers.

// function oldReducer(state = initialState, action) {
//     switch (action.type) {
//         case AUTH_LOGIN:
//             return  {...state, auth:true};

//         case AUTH_LOGOUT:
//             return {...state, auth:false};

//         case ADVERTS_LOADED:
//             return {...state, adverts: action.payload.adverts};
        
//         case ADVERTS_CREATED:
//             return {...state, adverts: [...state.adverts, action.payload.advert]}
//             //return {...state, adverts: state.adverts.concat(action.payload.advert)}
            
//         default:
//             return state;
            
//     }

// }

export function auth(state= initialState.auth, action){
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return  true;

        case AUTH_LOGOUT:
            return false;
            
        default:
            return state;
            
    }

}

export function adverts(state=initialState.adverts, action) {
    switch (action.type) {

        case ADVERTS_LOADED_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loaded:true,
            };
        
        case ADVERTS_CREATED_SUCCESS:
            return {...state, loaded:false, data: [...state.data, action.payload]};
        
        case DELETE_ADVERT_SUCCESS:
            const id= action.payload;
            const arrayAfterRemoval = state.data.filter(advert => advert.id != id )
            return {...state, loaded:false, data: arrayAfterRemoval};
            
            
        default:
            return state;
            
    }

}



export function ui (state= initialState.ui, action){

        if (action.error) {
            return {...state, loading:false, error:action.payload }
        } // Con este if manejamos todos los errores, vengan de auth o de la obtención de adverts porque detecta que trae un error a través de action.error
        switch (action.type) {
            case AUTH_LOGIN_REQUEST:
            case ADVERTS_LOADED_REQUEST:
            case TAGS_LOADED_REQUEST:
            case ADVERTS_CREATED_REQUEST:
            return {...state, loading:true, error:null};

            case AUTH_LOGIN_SUCCESS:
            case ADVERTS_LOADED_SUCCESS:
            case AUTH_LOGOUT:
            case ADVERTS_CREATED_SUCCESS:
            return {...state, loading:false, error:null};

            case UI_RESET_ERROR:
            return {...state, error:null};
            
            default:
            return state;
    }

    
}

export function tags(state=initialState.tags, action) {
    switch (action.type) {

        case TAGS_LOADED_SUCCESS:
            return {
                data: action.payload,
                loaded: true,
                };
            
        default:
            return state;
            
    }

}



// function reducerBeforeCombineReducer(state= initialState, action) {
//     return {
//         auth: auth(state.auth, action) ,
//         adverts: adverts(state.adverts, action),
//     }
// }

const reducer = combineReducers({
    auth,
    adverts,
})

//export default reducer;