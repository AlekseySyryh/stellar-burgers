import { configureStore } from '@reduxjs/toolkit';
import {
  getOrders,
  ordersReducer,
  initialState as ordersInitialState
} from './ordersSlice';
import { error, ordersMock } from '../mockdata';
import { initialState } from './feedSlice';

describe('Тесты редюсера ordersReducer', () => {
  test('getOrders.pending', () => {
    const initialState = {
      ...ordersInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = ordersReducer(initialState, {
      type: getOrders.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrders.fulfilled', () => {
    const initialState = {
      ...ordersInitialState,
      isLoading: true
    };

    const payload = {
      ...ordersMock,
      success: true
    };

    const expectedState = {
      orders: payload,
      isLoading: false,
      error: null
    };

    const actualState = ordersReducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrders.rejected', () => {
    const initialState = {
      ...ordersInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error
    };

    const actualState = ordersReducer(initialState, {
      type: getOrders.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrders', async () => {
    const expectedOrders = [...ordersMock.orders];
    const expectTotal = ordersMock.total;
    const expectedTotalToday = ordersMock.totalToday;

    const expectedResult = {
      success: true,
      orders: expectedOrders,
      total: expectTotal,
      totalToday: expectedTotalToday
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { orders: ordersReducer }
    });

    await store.dispatch(getOrders());

    const { orders } = store.getState().orders;

    expect(orders).toEqual(expectedOrders);
  });
});
