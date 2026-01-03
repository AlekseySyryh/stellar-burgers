import store, {RootState} from "./store";

describe('Проверки инициализации хранилища', () => {

  test('burgerConstructor', () => {
    const state = store.getState().burgerConstructor;

    expect(state).toEqual({
      constructorItems: { bun: null, ingredients: [] },
      error: null
    });
  });

  test('feed', () => {
    const state = store.getState().feed;

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    })
  });

  test('getOrder', () => {
    const state = store.getState().getOrder;

    expect(state).toEqual({
      selectedOrder: null,
      placedOrder: null,
      isLoading: false,
      error: null,
      name: null
    });
  });

  test('getOrders', () => {
    const state = store.getState().getOrders;
    
    expect(state).toEqual({
      orders: null,
      isLoading: false,
      error: null
    });
  });
    
  test('ingredients', () => {
    const state = store.getState().ingredients;

    expect(state).toEqual({
      ingredients: [],
      selected: null,
      isLoading: false,
      error: null
    });
  });
  
  test('user', () => {
    const state = store.getState().user;

    expect(state).toEqual({
        user: null,
        isLoading: false,
        loginError: undefined,
        registerError: undefined
    });
  });
});