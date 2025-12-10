import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

interface OrderData {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
  name: string | null;
}

const initialState: OrderData = {
  order: null,
  isLoading: false,
  error: null,
  name: null
};

export const getOrder = createAsyncThunk(
  'order/get',
  async (num: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(num);
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка загрузки заказа: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка загрузки заказа');
      }
    }
  }
);

export const placeOrder = createAsyncThunk(
  'order/place',
  async (data: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(data);
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка загрузки заказа: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка загрузки заказа');
      }
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.name = null;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (!payload.success) {
          state.error = 'Неудачный запрос';
        } else if (payload.orders.length != 1) {
          state.error = `Неверное количество заказов в запросе ${payload.orders.length} (ожидается 1)`;
        } else {
          state.order = payload.orders[0];
        }
      })
      .addCase(getOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.name = null;
      })
      .addCase(placeOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.order = payload.order;
        state.name = payload.name;
      })
      .addCase(placeOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
