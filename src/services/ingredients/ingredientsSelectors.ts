import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectorIngredients = (state: RootState) => state.ingredients.ingredients;
const selectorIsLoading = (state: RootState) => state.ingredients.isLoading;
const selectorError = (state: RootState) => state.ingredients.error;
const selectorSelected = (state: RootState) => state.ingredients.selected;

export const selectIngredients = createSelector(
  [selectorIngredients, selectorIsLoading, selectorError],
  (ingredients, isLoading, error) => ({
    buns: ingredients.filter((x) => x.type === 'bun'),
    mains: ingredients.filter((x) => x.type === 'main'),
    sauces: ingredients.filter((x) => x.type === 'sauce'),
    isLoading: isLoading,
    error: error
  })
);

export const selectAllIngredients = createSelector(
  [selectorIngredients, selectorIsLoading],
  (ingredients, isLoading) => ({
    ingredients,
    isLoading
  })
);

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectSelectedIngredient = createSelector(
  [selectorSelected, selectorIsLoading],
  (ingredientData, isLoading) => ({
    ingredientData,
    isLoading
  })
);
