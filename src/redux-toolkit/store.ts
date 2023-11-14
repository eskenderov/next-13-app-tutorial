import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./features/categorySlice";
export const store = configureStore({
  reducer: {
    CategoryReducer,
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
