import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

export type constructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

interface ConstructorState {
  constructorItems: constructorItems;
  error: string | null;
  nextId: number;
}

const initialState: ConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  error: null,
  nextId: 0
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const constructorIngredient = {
        ...action.payload,
        id: `${state.nextId++}`
      };
      if (constructorIngredient.type === 'bun') {
        state.constructorItems.bun = constructorIngredient;
      } else {
        state.constructorItems.ingredients.push(constructorIngredient);
      }
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
