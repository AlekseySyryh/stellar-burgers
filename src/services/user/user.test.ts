import { getUser, loginUser, logoutUser, registerUser, updateUser, userReducer } from "./userSlice";

describe('Тесты редюсера userReducer', () => {
  test('registerUser.pending', () => {
    const initialState = {
      user: null,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: registerUser.pending.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('registerUser.fulfilled', () => {
    const initialState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const payload = {
      email: "email",
      name: "name"
    }
    
    const expectedState = {
      user: payload,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: payload
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('registerUser.rejected', () => {
    const initialState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const error = "Видимо что-то случилось"
    
    const expectedState = {
      user: null,
      isLoading: false,
      loginError: undefined,
      registerError: error
    };

    const actualState = userReducer(initialState, {
      type: registerUser.rejected.type,
      payload: error
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('loginUser.pending', () => {
    const initialState = {
      user: null,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: loginUser.pending.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('loginUser.fulfilled', () => {
    const initialState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };
    
    const payload = {
      email: "email",
      name: "name"
    }

    const expectedState = {
      user: payload,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: payload
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('loginUser.rejected', () => {
    const initialState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };
    
    const error = "Видимо что-то случилось"

    const expectedState = {
      user: null,
      isLoading: false,
      loginError: error,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: loginUser.rejected.type,
      payload: error
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('logoutUser.pending', () => {
    const initialState = {
      user:  {
        email: "email",
        name: "name"
      },
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user:  {
        email: "email",
        name: "name"
      },
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: logoutUser.pending.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('logoutUser.fulfilled', () => {
    const initialState = {
      user: {
        email: "email",
        name: "name"
      },
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user: null,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: logoutUser.fulfilled.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('logoutUser.rejected', () => {
    const initialState = {
      user: {
        email: "email",
        name: "name"
      },
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const error = "Видимо что-то случилось";
    
    const expectedState = {
      user: null,
      isLoading: false,
      loginError: error,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: logoutUser.rejected.type,
      payload: error
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('getUser.pending', () => {
    const initialState = {
      user: null,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: getUser.pending.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('getUser.fulfilled', () => {
    const initialState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };
    
    const payload = {
      email: "email",
      name: "name"
    }

    const expectedState = {
      user: payload,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: payload
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('getUser.rejected', () => {
    const initialState = {
      user: null,
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const expectedState = {
      user: null,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: getUser.rejected.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('updateUser.pending', () => {
    const initialState = {
      user: {
        email: "email",
        name: "name"
      },
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user: {
        email: "email",
        name: "name"
      },
      isLoading: true,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: updateUser.pending.type
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('updateUser.fulfilled', () => {
    const initialState = {
      user: {
        email: "email",
        name: "name"
      },
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const payload = {
      email: "email2",
      name: "name2"      
    }

    const expectedState = {
      user: payload,
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: payload
    })
    
    expect(actualState).toEqual(expectedState);
  });

  test('updateUser.rejected', () => {
    const initialState = {
      user: {
        email: "email",
        name: "name"
      },
      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };
    
    const expectedState = {
      user: {
        email: "email",
        name: "name"
      },      isLoading: false,
      loginError: undefined,
      registerError: undefined
    };

    const actualState = userReducer(initialState, {
      type: updateUser.rejected.type
    })
    
    expect(actualState).toEqual(expectedState);
  });
});