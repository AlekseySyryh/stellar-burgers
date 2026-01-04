import { configureStore } from '@reduxjs/toolkit';
import {
  clearPlacedOrder,
  clearSelectedOrder,
  getOrder,
  orderReducer,
  placeOrder,
  initialState as orderInitialState
} from './orderSlice';
import { error, ordersMock } from '../mockdata';

describe('Тесты редюсера orderReducer', () => {
  test('clearSelectedOrder', () => {
    const initialState = {
      ...orderInitialState,
      selectedOrder: {
        ...ordersMock.orders[0]
      },
      placedOrder: {
        ...ordersMock.orders[1]
      }
    };

    const expectedState = {
      ...initialState,
      selectedOrder: null
    };

    const actualState = orderReducer(initialState, clearSelectedOrder());

    expect(actualState).toEqual(expectedState);
  });

  test('clearPlacedOrder', () => {
    const initialState = {
      ...orderInitialState,
      selectedOrder: {
        ...ordersMock.orders[0]
      },
      placedOrder: {
        ...ordersMock.orders[1]
      }
    };

    const expectedState = {
      ...initialState,
      placedOrder: null,
      name: null
    };

    const actualState = orderReducer(initialState, clearPlacedOrder());

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder.pending', () => {
    const initialState = {
      ...orderInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = orderReducer(initialState, {
      type: getOrder.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder.fulfilled', () => {
    const initialState = {
      ...orderInitialState,
      isLoading: true
    };

    const payload = {
      success: true,
      orders: [
        {...ordersMock.orders[0]}
      ]
    };

    const expectedState = {
      ...initialState,
      selectedOrder: 
      {
        ...ordersMock.orders[0]
      },
      isLoading: false
    };

    const actualState = orderReducer(initialState, {
      type: getOrder.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder.rejected', () => {
    const initialState = {
      ...orderInitialState,
      isLoading: true
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error
    };

    const actualState = orderReducer(initialState, {
      type: getOrder.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('placeOrder.pending', () => {
    const initialState = {
      ...orderInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = orderReducer(initialState, {
      type: placeOrder.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('placeOrder.fulfilled', () => {
    const initialState = {
      ...orderInitialState,
      isLoading: true
    };

    const payload = {
      success: true,
      name: ordersMock.orders[0].name,
      order: {
        ...ordersMock.orders[0]
      }
    };

    const expectedState = {
      ...initialState,
      placedOrder: {
        ...ordersMock.orders[0]
      },
      isLoading: false,
      name: ordersMock.orders[0].name
    };

    const actualState = orderReducer(initialState, {
      type: placeOrder.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('placeOrder.rejected', () => {
    const initialState = {
      ...orderInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error
    };

    const actualState = orderReducer(initialState, {
      type: placeOrder.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder', async () => {
    const expectedOrder = {
      ...ordersMock.orders[0]
    };

    const expectedResult = {
      success: true,
      orders: [expectedOrder]
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    await store.dispatch(getOrder(1));

    const { selectedOrder } = store.getState().order;

    expect(selectedOrder).toEqual(expectedOrder);
  });

  test('placeOrder', async () => {
    const expectedOrder = {
      ...ordersMock.orders[0]
    };

    const expectedName = expectedOrder.name;

    const expectedResult = {
      success: true,
      order: expectedOrder,
      name: expectedName
    };

    Object.defineProperty(document, 'cookie', {
      get: jest.fn(() => ''),
      set: jest.fn(() => {})
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    await store.dispatch(placeOrder(['a', 'b', 'c']));

    const { placedOrder, name } = store.getState().order;

    expect(placedOrder).toEqual(expectedOrder);
    expect(name).toEqual(expectedName);
  });
});
