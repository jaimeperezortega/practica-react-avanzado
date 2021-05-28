import {authLoginRequest} from './actions';
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST } from './types';

describe('authLoginRequest', ()=>{
    test('should return an AUTH_LOGIN_REQUEST action ', () => {
        const result = authLoginRequest()
        //expect(result.type).toBe(AUTH_LOGIN_REQUEST); //Son 3 matchers (comparadores) diferentes. Hay muchísimos tipos
        //expect(result).toMatchObject({type: AUTH_LOGIN_REQUEST});
        expect(result).toEqual({type: AUTH_LOGIN_REQUEST}); // ESte es el más preciso de los 3. Si metemos un nuevo parámetro en el objeto del action, este test no pasaría.
    })
});