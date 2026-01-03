import { configureStore } from "@reduxjs/toolkit";
import { getIngredients, ingredientsReducer, selectIngredient } from "./ingredientsSlice";

describe('Тесты редюсера ingredientsReducer', () => {
  test('selectIngredient', () => {
    const initialState = {
        ingredients: [
          {
            _id: 'id1',
            name: 'name1',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            _id: 'id2',
            name: 'name2',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            _id: 'id3',
            name: 'name3',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          }          
        ],
        selected: null,
        isLoading: false,
        error: null
    };

    const expectedState = {
        ingredients: [
          {
            _id: 'id1',
            name: 'name1',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            _id: 'id2',
            name: 'name2',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            _id: 'id3',
            name: 'name3',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          }          
        ],
        selected: {
          _id: 'id2',
          name: 'name2',
          type: 'main',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 4,
          price: 5,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        isLoading: false,
        error: null
    };

    const actualState = ingredientsReducer(initialState, selectIngredient('id2'));

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients.pending', () => {
    const initialState = {
      ingredients: [],
        selected: null,
        isLoading: false,
        error: null
    };

    const expectedState = {
      ingredients: [],
        selected: null,
        isLoading: true,
        error: null
    };

    const actualState = ingredientsReducer(initialState, {type: getIngredients.pending.type});

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients.fulfilled', () => {
    const initialState = {
      ingredients: [],
        selected: null,
        isLoading: true,
        error: null
    };

    const payload = [
          {
            _id: 'id1',
            name: 'name1',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            _id: 'id2',
            name: 'name2',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            _id: 'id3',
            name: 'name3',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          }          
        ];

    const expectedState = {
      ingredients: payload,
      selected: null,
      isLoading: false,
      error: null
    };

    const actualState = ingredientsReducer(
      initialState, 
      {
        type: getIngredients.fulfilled.type,
        payload: payload
      });

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients.rejected', () => {
    const initialState = {
      ingredients: [],
        selected: null,
        isLoading: true,
        error: null
    };

    const error = "Видимо что-то случилось";

    const expectedState = {
      ingredients: [],
        selected: null,
        isLoading: false,
        error: error
    };

    const actualState = ingredientsReducer(
      initialState, 
      {
        type: getIngredients.rejected.type,
        payload: error
      });

    expect(actualState).toEqual(expectedState);
  });

  test('getIngredients', async () => {
    const expected = [
      {
        _id: 'id1',
        name: 'name1',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 5,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: 'id2',
        name: 'name2',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 5,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: 'id3',
        name: 'name3',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 5,
        image: '',
        image_large: '',
        image_mobile: ''
      }          
    ];

    const expectedResult = {
      success: true,
      data: expected
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult),
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
