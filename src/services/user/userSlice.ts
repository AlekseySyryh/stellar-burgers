import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface UserData {
  user: TUser | null;
  isLoading: boolean;
  loginError: string | undefined;
  registerError: string | undefined;
}

const initialState: UserData = {
  user: null,
  isLoading: false,
  loginError: undefined,
  registerError: undefined
};

export const getUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getUserApi();
      if (result.success) {
        return result.user;
      } else {
        return rejectWithValue('Ошибка получения пользователя');
      }
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка получения пользователя: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка получения пользователя');
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const result = await loginUserApi(data);
      if (result.success) {
        setCookie('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        return result.user;
      } else {
        return rejectWithValue('Ошибка логина');
      }
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка логина: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка логина');
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = await logoutApi();
      if (result.success) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        return;
      } else {
        return rejectWithValue('Ошибка выхода');
      }
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка выхода: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка выхода');
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (info: TRegisterData, { rejectWithValue }) => {
    try {
      const result = await registerUserApi(info);
      if (result.success) {
        setCookie('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        return result.user;
      } else {
        rejectWithValue('Ошибка регистрации');
      }
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка регистрации: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка регистрации');
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (info: TRegisterData, { rejectWithValue }) => {
    try {
      const result = await updateUserApi(info);
      if (result.success) {
        return result.user;
      } else {
        rejectWithValue('Ошибка обновления пользователя');
      }
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(
          `Ошибка обновления пользователя: ${err.message}`
        );
      } else {
        return rejectWithValue('Ошибка обновления пользователя');
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
        state.registerError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload as TUser;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.registerError = payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
        state.registerError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload as TUser;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.loginError = payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
        state.registerError = undefined;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        state.loginError = payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
        state.registerError = undefined;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload as TUser;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
        state.registerError = undefined;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload as TUser;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  }
});

export const userReducer = userSlice.reducer;
