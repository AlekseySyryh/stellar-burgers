import { TIngredient } from '@utils-types';
import { addIngredient, clearConstructor, constructorReducer, moveIngredientDown, moveIngredientUp, removeIngredient } from './burgerConstructorSlice';

describe('Тесты редюсера constructorReducer', () => {
  test('addIngredient(bun add)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      error: null
    };
    const addon: TIngredient = {
      _id: 'id',
      name: 'name',
      type: 'bun',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 5,
      image: '',
      image_large: '',
      image_mobile: ''
    };
    const expectedState = {
      constructorItems: {
        bun: {
          _id: 'id',
          id: expect.any(String),
          name: 'name',
          type: 'bun',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 4,
          price: 5,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        ingredients: []
      },
      error: null
    };

    const newState = constructorReducer(initialState, addIngredient(addon));

    expect(newState).toEqual(expectedState);
  });

  test('addIngredient(bun replace)', () => {
    const initialState = {
      constructorItems: {
        bun: {
          _id: 'id1',
          id: 'id1',
          name: 'name1',
          type: 'bun1',
          proteins: 6,
          fat: 7,
          carbohydrates: 8,
          calories: 9,
          price: 10,
          image: '1',
          image_large: '1',
          image_mobile: '1'
        },
        ingredients: []
      },
      error: null
    };
    const addon: TIngredient = {
      _id: 'id',
      name: 'name',
      type: 'bun',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 5,
      image: '',
      image_large: '',
      image_mobile: ''
    };
    const expectedState = {
      constructorItems: {
        bun: {
          _id: 'id',
          id: expect.any(String),
          name: 'name',
          type: 'bun',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 4,
          price: 5,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        ingredients: []
      },
      error: null
    };

    const newState = constructorReducer(initialState, addIngredient(addon));

    expect(newState).toEqual(expectedState);
  });

  test('addIngredient(no bun)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id',
            id: 'id',
            name: 'name',
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
        ]
      },
      error: null
    };
    const addon: TIngredient = {
      _id: 'id2',
      name: 'name2',
      type: 'main',
      proteins: 6,
      fat: 7,
      carbohydrates: 8,
      calories: 9,
      price: 10,
      image: '',
      image_large: '',
      image_mobile: ''
    };
    const expectedState = {
constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id',
            id: 'id',
            name: 'name',
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
            id: expect.any(String),
            name: 'name2',
            type: 'main',
            proteins: 6,
            fat: 7,
            carbohydrates: 8,
            calories: 9,
            price: 10,
            image: '',
            image_large: '',
            image_mobile: ''
          }
        ]
      },
      error: null
    };

    const newState = constructorReducer(initialState, addIngredient(addon));

    expect(newState).toEqual(expectedState);
  });

  test('removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id',
            name: 'name',
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
            id: 'id',
            name: 'name',
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
            id: 'id',
            name: 'name',
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
        ]
      },
      error: null
    };
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id',
            name: 'name',
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
            id: 'id',
            name: 'name',
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
        ]
      },
      error: null
    };

    const actualState = constructorReducer(initialState, removeIngredient(1));

    expect(actualState).toEqual(expectedState);
  });

  test('moveIngredientUp (top)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id1',
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
            id: 'id2',
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
            id: 'id3',
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
        ]
      },
      error: null
    };

    const actualState = constructorReducer(initialState, moveIngredientUp(0));

    expect(actualState).toEqual(initialState);
  });

  test('moveIngredientUp (non top)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id1',
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
            id: 'id2',
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
            id: 'id3',
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
        ]
      },
      error: null
    };
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id2',
            id: 'id2',
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
            _id: 'id1',
            id: 'id1',
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
            _id: 'id3',
            id: 'id3',
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
        ]
      },
      error: null
    };


    const actualState = constructorReducer(initialState, moveIngredientUp(1));

    expect(actualState).toEqual(expectedState);
  });

  test('moveIngredientDown (bottom)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id1',
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
            id: 'id2',
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
            id: 'id3',
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
        ]
      },
      error: null
    };

    const actualState = constructorReducer(initialState, moveIngredientDown(2));

    expect(actualState).toEqual(initialState);
  });

  test('moveIngredientDown (non bottom)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id1',
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
            id: 'id2',
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
            id: 'id3',
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
        ]
      },
      error: null
    };

    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: 'id1',
            id: 'id1',
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
            _id: 'id3',
            id: 'id3',
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
          },
          {
            _id: 'id2',
            id: 'id2',
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
          }
        ]
      },
      error: null
    };

    const actualState = constructorReducer(initialState, moveIngredientDown(1));

    expect(actualState).toEqual(expectedState);
  });

  test('clearConstructor', () => {
    const initialState = {
      constructorItems: {
        bun: {
            _id: 'id',
            id: 'id',
            name: 'name',
            type: 'bun',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 4,
            price: 5,
            image: '',
            image_large: '',
            image_mobile: ''
          },
        ingredients: [
          {
            _id: 'id1',
            id: 'id1',
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
            id: 'id2',
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
            id: 'id3',
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
        ]
      },
      error: null
    };

    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      error: null
    };

    const actualState = constructorReducer(initialState, clearConstructor());

    expect(actualState).toEqual(expectedState);
  });
});