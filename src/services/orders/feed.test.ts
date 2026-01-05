import { configureStore } from '@reduxjs/toolkit';
import {
  feedReducer,
  getFeed,
  initialState as feedInitialState
} from './feedSlice';
import { error, ordersMock } from '../mockdata';

describe('Тесты редюсера feedReducer', () => {
  test('getFeed.pending', () => {
    const initialState = {
      ...feedInitialState
    };

    const expectedState = {
      ...feedInitialState,
      isLoading: true
    };

    const actualState = feedReducer(initialState, {
      type: getFeed.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getFeed.fulfilled', () => {
    const initialState = {
      ...feedInitialState,
      isLoading: true
    };

    const payload = {
      ...ordersMock
    };

    const expectedState = {
      ...initialState,
      orders: [...ordersMock.orders],
      total: ordersMock.total,
      totalToday: ordersMock.totalToday,
      isLoading: false
    };

    const actualState = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getFeed.rejected', () => {
    const initialState = {
      ...feedInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error
    };

    const actualState = feedReducer(initialState, {
      type: getFeed.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getFeed', async () => {
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
      reducer: { feed: feedReducer }
    });

    await store.dispatch(getFeed());

    const { orders, total, totalToday } = store.getState().feed;

    expect(orders).toEqual(expectedOrders);
    expect(total).toEqual(expectTotal);
    expect(totalToday).toEqual(expectedTotalToday);
  });
});
