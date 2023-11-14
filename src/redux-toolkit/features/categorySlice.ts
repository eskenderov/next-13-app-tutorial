import { CategoryType } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CategotyStateType {
  items: CategoryType[];
}

const initialState: CategotyStateType = {
  items: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CategoryType[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = categorySlice.actions;

export const selectCategoryByTab = (state: RootState, categTab?: string) =>
  state.CategoryReducer.items.find((categ) => categ.tab === categTab);

export default categorySlice.reducer;
