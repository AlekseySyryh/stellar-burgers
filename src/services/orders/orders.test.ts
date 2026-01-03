import { configureStore } from '@reduxjs/toolkit';
import { getOrders, ordersReducer } from './ordersSlice';

describe('Тесты редюсера ordersReducer', () => {
  test('getOrders.pending', () => {
    const initialState = {
      orders: null,
      isLoading: false,
      error: null
    };

    const expectedState = {
      orders: null,
      isLoading: true,
      error: null
    };

    const actualState = ordersReducer(initialState, {
      type: getOrders.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrders.fulfilled', () => {
    const initialState = {
      orders: null,
      isLoading: true,
      error: null
    };

    const payload = {
      success: true,
      orders: [
        {
          _id: '695935b8a64177001b325d26',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный люминесцентный бургер',
          createdAt: '2026-01-03T15:28:56.930Z',
          updatedAt: '2026-01-03T15:28:57.175Z',
          number: 98316
        },
        {
          _id: '69593371a64177001b325d24',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный люминесцентный бургер',
          createdAt: '2026-01-03T15:19:13.286Z',
          updatedAt: '2026-01-03T15:19:13.518Z',
          number: 98315
        }
      ],
      total: 22310,
      totalToday: 20
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
      orders: null,
      isLoading: true,
      error: null
    };

    const error = 'Видимо что-то случилось';

    const expectedState = {
      orders: null,
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
    const expectedOrders = [
      {
        _id: '695935b8a64177001b325d26',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный люминесцентный бургер',
        createdAt: '2026-01-03T15:28:56.930Z',
        updatedAt: '2026-01-03T15:28:57.175Z',
        number: 98316
      },
      {
        _id: '69593371a64177001b325d24',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный люминесцентный бургер',
        createdAt: '2026-01-03T15:19:13.286Z',
        updatedAt: '2026-01-03T15:19:13.518Z',
        number: 98315
      }
    ];
    const expectTotal = 22310;
    const expectedTotalToday = 20;

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
