import {authLoginRequest, advertsLoadedSuccess, authLoginFailure, loginAction} from './actions';
import { AUTH_LOGIN_REQUEST, ADVERTS_LOADED_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_SUCCESS } from './types';

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

//En testing de acciones asincronas necesitamos simular (mockear) los parámetros de entrada. En loginAction() por ejemplo el método login. No llamamos al método real porque no podemos depender de que el backend esté disponible o no. Le vamos a pasar una función que simule el com portamiento de la función login() que resuelva, y una vez resuelve que se despache la acción login

describe('loginAction', () => {
    //Primero testeamos el flujo de cuando todo vaya correcto
    //Vamos a simular en primer lugar que cuando llame a la funciómn login resuelva con un promesa 
    describe('when login api resolves', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn() // Esto me crea una función que luego me permite hacer comprobaciones como que si ha sido llamada
        const getState = () => {};
        const api = {
            auth: {login: jest.fn().mockResolvedValue()},
            };
        
        
        test('should dispatch an AUTH_LOGIN_REQUEST action', () =>{
            action(dispatch, getState, {api});
            expect(dispatch).toHaveBeenCalledWith({type: AUTH_LOGIN_REQUEST});
        });

        test('should call api.auth.login()', () =>{
            action(dispatch, getState, {api});
            expect(api.auth.login).toHaveBeenCalledWith(credentials);
        });

        test('should dispatch an AUTH_LOGIN_SUCCESS action', async () =>{
            await action(dispatch, getState, {api});
            expect(dispatch).toHaveBeenNthCalledWith(2,{type: AUTH_LOGIN_SUCCESS});
        });


    describe('when login api throws error', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn() // Esto me crea una función que luego me permite hacer comprobaciones como que si ha sido llamada
        const getState = () => {};
        const error = 'Unauthorized'
        
        
      
        test('should dispatch an AUTH_LOGIN_FAILURE action', async () =>{
            const api = {
                auth: {login: jest.fn().mockRejectedValue(error)},
                };
            await action(dispatch, getState, {api});
            expect(dispatch).toHaveBeenNthCalledWith(2,{type: AUTH_LOGIN_FAILURE, payload:error, error:true});
             });
        })
    });

})