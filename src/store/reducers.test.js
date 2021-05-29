
import {adverts, initialState}  from './reducers';
import {ADVERTS_LOADED_SUCCESS} from './types';




describe('adverts', () => {
    test('should manage ANY action', () => {
      const state = initialState.adverts;
      const action = { type: 'ANY' };
      const nextState = adverts(state, action);
      expect(nextState).toBe(state);
    })
    test('should manage ADVERTS_LOADED_SUCCESS action', () => {
        const state = initialState.adverts;
        const advertsData = [];
        const action = { type: ADVERTS_LOADED_SUCCESS, payload: advertsData};
        const expectedState = {
          ...initialState.adverts,
          loaded: true,
          data: advertsData,
        };
        const nextState = adverts(state, action);
        expect(nextState).toStrictEqual(expectedState);
      });

    
})
