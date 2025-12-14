import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 } from 'uuid';

export type constructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

interface ConstructorState {
  constructorItems: constructorItems;
  error: string | null;
}

const initialState: ConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: v4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      if (
        action.payload >= 0 &&
        action.payload < state.constructorItems.ingredients.length
      ) {
        state.constructorItems.ingredients.splice(action.payload, 1);
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      if (
        action.payload > 0 &&
        action.payload < state.constructorItems.ingredients.length
      ) {
        state.constructorItems.ingredients.splice(
          action.payload - 1,
          2,
          state.constructorItems.ingredients[action.payload],
          state.constructorItems.ingredients[action.payload - 1]
        );
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      if (
        action.payload >= 0 &&
        action.payload < state.constructorItems.ingredients.length - 1
      ) {
        state.constructorItems.ingredients.splice(
          action.payload,
          2,
          state.constructorItems.ingredients[action.payload + 1],
          state.constructorItems.ingredients[action.payload]
        );
      }
    },
    clearConstructor: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = burgerConstructorSlice.actions;

export const constuctorReducer = burgerConstructorSlice.reducer;
