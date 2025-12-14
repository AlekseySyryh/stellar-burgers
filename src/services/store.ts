import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './ingredients/ingredientsSlice';
import { constuctorReducer } from './burgerConstructor/burgerConstructorSlice';
import { feedReducer } from './orders/feedSlice';
import { orderReducer } from './orders/orderSlice';
import { userReducer } from './user/userSlice';
import { ordersReducer } from './orders/ordersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constuctorReducer,
  feed: feedReducer,
  getOrder: orderReducer,
  getOrders: ordersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
