import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./features/categorySlice";
import CartReducer from "./features/cartSlice";
export const store = configureStore({
  reducer: {
    CategoryReducer,
    CartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
