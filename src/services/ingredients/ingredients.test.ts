import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredients,
  ingredientsReducer,
  selectIngredient,
  initialState as ingredientsInitialState
} from './ingredientsSlice';
import { error, main1, main2, main3 } from '../mockdata';

describe('Тесты редюсера ingredientsReducer', () => {
  test('selectIngredient', () => {
    const initialState = {
      ...ingredientsInitialState,
      ingredients: [{ ...main1 }, { ...main2 }, { ...main3 }]
    };

    const expectedState = {
      ...initialState,
      selected: {
        ...main2
      }
    };

    const actualState = ingredientsReducer(
      initialState,
      selectIngredient('id2')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients.pending', () => {
    const initialState = {
      ...ingredientsInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = ingredientsReducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients.fulfilled', () => {
    const initialState = {
      ...ingredientsInitialState,
      isLoading: true
    };

    const payload = [{ ...main1 }, { ...main2 }, { ...main3 }];

    const expectedState = {
      ...initialState,
      ingredients: payload,
      isLoading: false
    };

    const actualState = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients.rejected', () => {
    const initialState = {
      ...ingredientsInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error
    };

    const actualState = ingredientsReducer(initialState, {
      type: getIngredients.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients', async () => {
    const expected = [{ ...main1 }, { ...main2 }, { ...main3 }];

    const expectedResult = {
      success: true,
      data: expected
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    await store.dispatch(getIngredients());

    const { ingredients } = store.getState().ingredients;

    expect(ingredients).toEqual(expected);
  });
});
