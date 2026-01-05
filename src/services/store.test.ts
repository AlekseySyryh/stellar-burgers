import {
  constructorReducer,
  initialState as burgerConstructorInitialState
} from './burgerConstructor/burgerConstructorSlice';
import {
  ingredientsReducer,
  initialState as ingredientsInitialState
} from './ingredients/ingredientsSlice';
import {
  feedReducer,
  initialState as feedInitialState
} from './orders/feedSlice';
import {
  orderReducer,
  initialState as orderInitialState
} from './orders/orderSlice';
import {
  ordersReducer,
  initialState as ordersInitialState
} from './orders/ordersSlice';
import store, { rootReducer } from './store';
import {
  userReducer,
  initialState as userInitialState
} from './user/userSlice';

describe('Проверки инициализации хранилища', () => {
  test('burgerConstructor', () => {
    const state = store.getState().burgerConstructor;

    expect(state).toEqual(burgerConstructorInitialState);
  });

  test('feed', () => {
    const state = store.getState().feed;

    expect(state).toEqual(feedInitialState);
  });

  test('getOrder', () => {
    const state = store.getState().getOrder;

    expect(state).toEqual(orderInitialState);
  });

  test('getOrders', () => {
    const state = store.getState().getOrders;

    expect(state).toEqual(ordersInitialState);
  });

  test('ingredients', () => {
    const state = store.getState().ingredients;

    expect(state).toEqual(ingredientsInitialState);
  });

  test('user', () => {
    const state = store.getState().user;

    expect(state).toEqual(userInitialState);
  });
});

describe('Тест rootReducer', () => {
  it('rootReducer должен возвращать корректное начальное состояние', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      getOrder: orderReducer(undefined, initAction),
      getOrders: ordersReducer(undefined, initAction),
      user: userReducer(undefined, initAction)
    });
  });

  it('rootReducer должен возвращать то же состояние при неизвестном экшене', () => {
    const prevState = store.getState();
    const state = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });
    expect(state).toBe(prevState);
  });
});
