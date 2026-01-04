import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

interface OrderData {
  orders: TOrder[] | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: OrderData = {
  orders: null,
  isLoading: false,
  error: null
};

export const getOrders = createAsyncThunk(
  'orders/get',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка загрузки заказов: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка загрузки заказов');
      }
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
