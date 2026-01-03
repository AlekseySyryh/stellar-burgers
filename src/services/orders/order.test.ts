import { configureStore } from "@reduxjs/toolkit";
import { clearPlacedOrder, clearSelectedOrder, getOrder, orderReducer, placeOrder } from "./orderSlice";

describe('Тесты редюсера orderReducer', () => {
  test('clearSelectedOrder', () => {
    const initialState = {
      selectedOrder: {
            _id: "695935b8a64177001b325d26",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:28:56.930Z",
            updatedAt: "2026-01-03T15:28:57.175Z",
            number: 98316
        },
      placedOrder: {
            _id: "69593371a64177001b325d24",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:19:13.286Z",
            updatedAt: "2026-01-03T15:19:13.518Z",
            number: 98315
        },
      isLoading: false,
      error: null,
      name: null
    };

    const expectedState = {
      selectedOrder: null,
      placedOrder: {
            _id: "69593371a64177001b325d24",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:19:13.286Z",
            updatedAt: "2026-01-03T15:19:13.518Z",
            number: 98315
        },
      isLoading: false,
      error: null,
      name: null
    };

    const actualState = orderReducer(initialState, clearSelectedOrder());

    expect(actualState).toEqual(expectedState);
  });

  test('clearPlacedOrder', () => {
    const initialState = {
      selectedOrder: {
            _id: "695935b8a64177001b325d26",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:28:56.930Z",
            updatedAt: "2026-01-03T15:28:57.175Z",
            number: 98316
        },
      placedOrder: {
            _id: "69593371a64177001b325d24",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:19:13.286Z",
            updatedAt: "2026-01-03T15:19:13.518Z",
            number: 98315
        },
      isLoading: false,
      error: null,
      name: null
    };

    const expectedState = {
      selectedOrder: {
            _id: "695935b8a64177001b325d26",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:28:56.930Z",
            updatedAt: "2026-01-03T15:28:57.175Z",
            number: 98316
        },
      placedOrder: null,
      isLoading: false,
      error: null,
      name: null
    };

    const actualState = orderReducer(initialState, clearPlacedOrder());

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder.pending', () => {
    const initialState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: false,
      error: null,
      name: null
    };

    const expectedState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: true,
      error: null,
      name: null
    };

    const actualState = orderReducer(initialState, {
      type: getOrder.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder.fulfilled', () => {
    const initialState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: true,
      error: null,
      name: null
    };

    const payload = {
      success: true,
      orders: [
        {
            _id: "695935b8a64177001b325d26",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            owner: "69592f87a64177001b325d19",
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:28:56.930Z",
            updatedAt: "2026-01-03T15:28:57.175Z",
            number: 98316,
            __v: 0
        }
      ]
    };

    const expectedState = {
      selectedOrder: {
        _id: "695935b8a64177001b325d26",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093d"
        ],
        owner: "69592f87a64177001b325d19",
        status: "done",
        name: "Space флюоресцентный люминесцентный бургер",
        createdAt: "2026-01-03T15:28:56.930Z",
        updatedAt: "2026-01-03T15:28:57.175Z",
        number: 98316,
        __v: 0
      },
      placedOrder: null,
      isLoading: false,
      error: null,
      name: null
    };

    const actualState = orderReducer(initialState, {
      type: getOrder.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder.rejected', () => {
    const initialState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: true,
      error: null,
      name: null
    };

    const error = "Видимо что-то случилсь";

    const expectedState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: false,
      error: error,
      name: null
    };

    const actualState = orderReducer(initialState, {
      type: getOrder.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('placeOrder.pending', () => {
    const initialState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: false,
      error: null,
      name: null
    };

    const expectedState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: true,
      error: null,
      name: null
    };

    const actualState = orderReducer(initialState, {
      type: placeOrder.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('placeOrder.fulfilled', () => {
     const initialState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: true,
      error: null,
      name: null
    };

    const payload = {
      success: true,
      name: "Флюоресцентный люминесцентный бургер",
      order: {
        ingredients: [
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093e",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          }
        ],
        _id: "69593bb5a64177001b325d34",
        owner: {
          name: "Aleksey",
          email: "asyryh@gmail.com",
          createdAt: "2025-12-08T19:00:16.614Z",
          updatedAt: "2026-01-02T17:16:38.385Z"
        },
        status: "done",
        name: "Флюоресцентный люминесцентный бургер",
        createdAt: "2026-01-03T15:54:29.194Z",
        updatedAt: "2026-01-03T15:54:29.458Z",
        number: 98319,
        price: 2964
      }
    };

    const expectedState = {
      selectedOrder: null,
      placedOrder: {
        ingredients: [
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093e",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          }
        ],
        _id: "69593bb5a64177001b325d34",
        owner: {
          name: "Aleksey",
          email: "asyryh@gmail.com",
          createdAt: "2025-12-08T19:00:16.614Z",
          updatedAt: "2026-01-02T17:16:38.385Z"
        },
        status: "done",
        name: "Флюоресцентный люминесцентный бургер",
        createdAt: "2026-01-03T15:54:29.194Z",
        updatedAt: "2026-01-03T15:54:29.458Z",
        number: 98319,
        price: 2964
      },
      isLoading: false,
      error: null,
      name: "Флюоресцентный люминесцентный бургер"
    };

    const actualState = orderReducer(initialState, {
      type: placeOrder.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('placeOrder.rejected', () => {
     const initialState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: true,
      error: null,
      name: null
    };

    const error = "Видимо что-то случилось";

    const expectedState = {
      selectedOrder: null,
      placedOrder: null,
      isLoading: false,
      error: error,
      name: null
    };

    const actualState = orderReducer(initialState, {
      type: placeOrder.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getOrder', async () => {
      const expectedOrder = 
        {
            _id: "695935b8a64177001b325d26",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            owner: "69592f87a64177001b325d19",
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:28:56.930Z",
            updatedAt: "2026-01-03T15:28:57.175Z",
            number: 98316,
            __v: 0
        };
      
      const expectedResult = {
        success: true,
        orders: [expectedOrder],
      }
    
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResult),
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
      const expectedOrder = 
        {
        ingredients: [
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093e",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          }
        ],
        _id: "69593bb5a64177001b325d34",
        owner: {
          name: "Aleksey",
          email: "asyryh@gmail.com",
          createdAt: "2025-12-08T19:00:16.614Z",
          updatedAt: "2026-01-02T17:16:38.385Z"
        },
        status: "done",
        name: "Флюоресцентный люминесцентный бургер",
        createdAt: "2026-01-03T15:54:29.194Z",
        updatedAt: "2026-01-03T15:54:29.458Z",
        number: 98319,
        price: 2964
      };
      
      const expectedName = "Флюоресцентный люминесцентный бургер";
    
      const expectedResult = {
        success: true,
        order: expectedOrder,
        name: expectedName
      }
      
      Object.defineProperty(document, 'cookie', {
          get: jest.fn(() => ''),
          set: jest.fn(() => {}),
      });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResult),
        })
      ) as jest.Mock;
    
      const store = configureStore({
        reducer: { order: orderReducer }
      });
    
      await store.dispatch(placeOrder(['a','b','c']));
    
      console.log(store.getState());

      const { placedOrder, name } = store.getState().order;
          
      expect(placedOrder).toEqual(expectedOrder);
      expect(name).toEqual(expectedName);
    });
});