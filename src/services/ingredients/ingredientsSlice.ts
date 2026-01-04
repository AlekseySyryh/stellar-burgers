import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

interface IngredientsState {
  ingredients: TIngredient[];
  selected: TIngredient | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  selected: null,
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (err: any) {
      if ('message' in err) {
        return rejectWithValue(`Ошибка загрузки ингридиентов: ${err.message}`);
      } else {
        return rejectWithValue('Ошибка загрузки ингридиентов');
      }
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<string>) => {
      state.selected =
        state.ingredients.find(
          (ingredient) => ingredient._id === action.payload
        ) ?? null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ingredients = payload;
      })
      .addCase(getIngredients.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  }
});
export const { selectIngredient } = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
