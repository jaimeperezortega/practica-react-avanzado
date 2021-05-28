import {authLoginRequest, advertsLoadedSuccess, authLoginFailure} from './actions';
import { AUTH_LOGIN_REQUEST, ADVERTS_LOADED_SUCCESS, AUTH_LOGIN_FAILURE } from './types';

describe('authLoginRequest', ()=>{
    test('should return an AUTH_LOGIN_REQUEST action ', () => {
        const result = authLoginRequest()
        //expect(result.type).toBe(AUTH_LOGIN_REQUEST); //Son 3 matchers (comparadores) diferentes. Hay muchísimos tipos
        //expect(result).toMatchObject({type: AUTH_LOGIN_REQUEST});
        expect(result).toEqual({type: AUTH_LOGIN_REQUEST}); // ESte es el más preciso de los 3. Si metemos un nuevo parámetro en el objeto del action, este test no pasaría.
    })
});

describe('advertsLoadedSuccess', () => {
    test('should return an ADVERTS_LOADED_SUCCESS action', () => {
        const adverts = 'adverts';// Nos tenemos que crear unos adverts que no tiene por qué ser un array de datos. Al ser un test unitario que no va a pasar por un reducer o algo así, lo único que nos interesa es que nos devuelva este mismo dato. Lo único que te importa es que lo que tú le pasas te lo devuelva en el payload
        const expectedAction = {type: ADVERTS_LOADED_SUCCESS, payload: adverts};
        const result = advertsLoadedSuccess(adverts);
        expect(result).toEqual(expectedAction);
    })
});

describe('authLoginFailure', () => {
    test('should return an AUTH_LOGIN_FAILURE action', () => {
        const error= 'fake error';
        const expectedAction = {type:AUTH_LOGIN_FAILURE, payload: error, error:true};
        const result = authLoginFailure(error);
        expect(result).toEqual(expectedAction);
    })
})