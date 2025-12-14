import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';
import { clearConstructor } from '../burgerConstructor/burgerConstructorSlice';

interface OrderData {
  selectedOrder: TOrder | null;
  placedOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
  name: string | null;
}

const initialState: OrderData = {
  selectedOrder: null,
  placedOrder: null,
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
  async (data: string[], { rejectWithValue, dispatch }) => {
    try {
      const result = await orderBurgerApi(data);
      if (result.success) {
        dispatch(clearConstructor());
        return result;
      } else {
        return rejectWithValue('Ошибка размещения заказа');
      }
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка размещения заказа: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка размещения заказа');
      }
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    clearPlacedOrder: (state) => {
      state.placedOrder = null;
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
          state.selectedOrder = payload.orders[0];
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
        state.placedOrder = payload.order;
        state.name = payload.name;
      })
      .addCase(placeOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  }
});

export const { clearSelectedOrder, clearPlacedOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
