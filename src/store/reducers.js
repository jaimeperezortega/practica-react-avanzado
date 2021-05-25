
import {ADVERTS_CREATED, ADVERTS_LOADED, AUTH_LOGIN, AUTH_LOGOUT} from './types'

const initialState = {
    auth: false,
    adverts: [],
}


// Redux permite combinar distintos reducers en uno solo de tal forma que cada reducer maneje una perte concreta del estado. En Este caso, tenemos un reducer que maneja solo el estado auth a true o false pero cuando ncesirtemos manejar más estados, tendremos que crear más reducers.

function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return  {...state, auth:true};

        case AUTH_LOGOUT:
            return {...state, auth:false};

        case ADVERTS_LOADED:
            return {...state, adverts: action.payload.adverts};
        
        case ADVERTS_CREATED:
            return {...state, adverts: [...state.adverts, action.payload.advert]}
            //return {...state, adverts: state.adverts.concat(action.payload.advert)}
            
        default:
            return state;
            
    }

}

export default reducer;