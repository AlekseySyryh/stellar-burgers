import { feedReducer, getFeed } from "./feedSlice";

describe('Тесты редюсера feedReducer', () => {
  test('getFeed.pending', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    };

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };

    const actualState = feedReducer(initialState, {
      type: getFeed.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getFeed.fulfilled', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
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
            status: "done",
            name: "Space флюоресцентный люминесцентный бургер",
            createdAt: "2026-01-03T15:28:56.930Z",
            updatedAt: "2026-01-03T15:28:57.175Z",
            number: 98316
        },
        {
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
        }
      ],
      total: 22310,
      totalToday: 20
    };

    const expectedState = {
      orders: [
        {
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
        {
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
        }
      ],
      total: 22310,
      totalToday: 20,
      isLoading: false,
      error: null
    };

    const actualState = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getFeed.rejected', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };

    const error = "Видимо что-то случилось";

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: error
    };

    const actualState = feedReducer(initialState, {
      type: getFeed.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });
});
