import { TIngredient } from '@utils-types';
import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  initialState as burgerInitialState
} from './burgerConstructorSlice';
import { bun1, bun2, main1, main2, main3 } from '../mockdata';

describe('Тесты редюсера constructorReducer', () => {
  test('addIngredient(bun add)', () => {
    const initialState = { ...burgerInitialState };
    const addon = { ...bun1 };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        bun: {
          ...addon,
          id: expect.any(String)
        }
      }
    };

    const newState = constructorReducer(initialState, addIngredient(addon));

    expect(newState).toEqual(expectedState);
  });

  test('addIngredient(bun replace)', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        bun: {
          ...bun1,
          id: 'id1'
        }
      }
    };

    const addon = bun2;

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        bun: {
          ...bun2,
          id: expect.any(String)
        }
      }
    };

    const newState = constructorReducer(initialState, addIngredient(addon));

    expect(newState).toEqual(expectedState);
  });

  test('addIngredient(no bun)', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [main1]
      }
    };

    const addon = {
      ...main2,
      id: expect.any(String)
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [...initialState.constructorItems.ingredients, addon]
      }
    };

    const newState = constructorReducer(initialState, addIngredient(addon));

    expect(newState).toEqual(expectedState);
  });

  test('removeIngredient', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const actualState = constructorReducer(initialState, removeIngredient(1));

    expect(actualState).toEqual(expectedState);
  });

  test('moveIngredientUp (top)', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const actualState = constructorReducer(initialState, moveIngredientUp(0));

    expect(actualState).toEqual(initialState);
  });

  test('moveIngredientUp (non top)', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const expectedState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const actualState = constructorReducer(initialState, moveIngredientUp(1));

    expect(actualState).toEqual(expectedState);
  });

  test('moveIngredientDown (bottom)', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const actualState = constructorReducer(initialState, moveIngredientDown(2));

    expect(actualState).toEqual(initialState);
  });

  test('moveIngredientDown (non bottom)', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main3,
            id: 'id3'
          },
          {
            ...main2,
            id: 'id2'
          }
        ]
      }
    };

    const actualState = constructorReducer(initialState, moveIngredientDown(1));

    expect(actualState).toEqual(expectedState);
  });

  test('clearConstructor', () => {
    const initialState = {
      ...burgerInitialState,
      constructorItems: {
        ...burgerInitialState.constructorItems,
        ingredients: [
          {
            ...main1,
            id: 'id1'
          },
          {
            ...main2,
            id: 'id2'
          },
          {
            ...main3,
            id: 'id3'
          }
        ]
      }
    };

    const expectedState = {
      ...burgerInitialState
    };

    const actualState = constructorReducer(initialState, clearConstructor());

    expect(actualState).toEqual(expectedState);
  });
});
