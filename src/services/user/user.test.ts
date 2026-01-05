import { configureStore } from '@reduxjs/toolkit';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userReducer,
  initialState as userInitialState,
  initialState
} from './userSlice';
import { error, userMock, userMock2 } from '../mockdata';

describe('Тесты редюсера userReducer', () => {
  test('registerUser.pending', () => {
    const initialState = {
      ...userInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = userReducer(initialState, {
      type: registerUser.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('registerUser.fulfilled', () => {
    const initialState = {
      ...userInitialState,
      isLoading: true
    };

    const payload = {
      ...userMock
    };

    const expectedState = {
      ...initialState,
      user: payload,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('registerUser.rejected', () => {
    const initialState = {
      ...userInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      registerError: error
    };

    const actualState = userReducer(initialState, {
      type: registerUser.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('loginUser.pending', () => {
    const initialState = {
      ...userInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = userReducer(initialState, {
      type: loginUser.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('loginUser.fulfilled', () => {
    const initialState = {
      ...userInitialState,
      isLoading: true
    };

    const payload = {
      ...userMock
    };

    const expectedState = {
      ...initialState,
      user: payload,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('loginUser.rejected', () => {
    const initialState = {
      ...userInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      loginError: error
    };

    const actualState = userReducer(initialState, {
      type: loginUser.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('logoutUser.pending', () => {
    const initialState = {
      ...userInitialState,
      user: {
        ...userMock
      }
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = userReducer(initialState, {
      type: logoutUser.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('logoutUser.fulfilled', () => {
    const initialState = {
      ...userInitialState,
      user: {
        ...userMock
      },
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      user: null,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: logoutUser.fulfilled.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('logoutUser.rejected', () => {
    const initialState = {
      ...userInitialState,
      user: {
        ...userMock
      },
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      user: null,
      isLoading: false,
      loginError: error
    };

    const actualState = userReducer(initialState, {
      type: logoutUser.rejected.type,
      payload: error
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getUser.pending', () => {
    const initialState = {
      ...userInitialState
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = userReducer(initialState, {
      type: getUser.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getUser.fulfilled', () => {
    const initialState = {
      ...userInitialState,
      isLoading: true
    };

    const payload = {
      ...userMock
    };

    const expectedState = {
      ...initialState,
      user: payload,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getUser.rejected', () => {
    const initialState = {
      ...userInitialState,
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: getUser.rejected.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('updateUser.pending', () => {
    const initialState = {
      ...userInitialState,
      user: {
        ...userMock
      }
    };

    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const actualState = userReducer(initialState, {
      type: updateUser.pending.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('updateUser.fulfilled', () => {
    const initialState = {
      ...userInitialState,
      user: {
        ...userMock
      },
      isLoading: true
    };

    const payload = {
      ...userMock2
    };

    const expectedState = {
      ...initialState,
      user: payload,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: payload
    });

    expect(actualState).toEqual(expectedState);
  });

  test('updateUser.rejected', () => {
    const initialState = {
      ...userInitialState,
      user: {
        ...userMock
      },
      isLoading: true
    };

    const expectedState = {
      ...initialState,
      isLoading: false
    };

    const actualState = userReducer(initialState, {
      type: updateUser.rejected.type
    });

    expect(actualState).toEqual(expectedState);
  });

  test('getUser', async () => {
    const expectedUser = {
      ...userMock
    };

    const expectedResult = {
      success: true,
      user: expectedUser
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { users: userReducer }
    });

    await store.dispatch(getUser());

    const { user } = store.getState().users;

    expect(user).toEqual(expectedUser);
  });

  test('loginUser', async () => {
    const expectedUser = {
      ...userMock
    };

    const expectedResult = {
      success: true,
      user: expectedUser
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { users: userReducer }
    });

    await store.dispatch(
      loginUser({
        email: 'email',
        password: 'password'
      })
    );

    const { user } = store.getState().users;

    expect(user).toEqual(expectedUser);
  });

  test('logoutUser', async () => {
    const expectedResult = {
      success: true
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { users: userReducer }
    });

    await store.dispatch(logoutUser());

    const { user } = store.getState().users;

    expect(user).toEqual(null);
  });

  test('registerUser', async () => {
    const expectedUser = {
      ...userMock
    };

    const expectedResult = {
      success: true,
      user: expectedUser
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { users: userReducer }
    });

    await store.dispatch(
      registerUser({
        email: 'email',
        name: 'name',
        password: 'password'
      })
    );

    const { user } = store.getState().users;

    expect(user).toEqual(expectedUser);
  });

  test('registerUser', async () => {
    const expectedUser = {
      ...userMock
    };

    const expectedResult = {
      success: true,
      user: expectedUser
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { users: userReducer }
    });

    await store.dispatch(
      updateUser({
        email: 'email',
        name: 'name',
        password: 'password'
      })
    );

    const { user } = store.getState().users;

    expect(user).toEqual(expectedUser);
  });
});
