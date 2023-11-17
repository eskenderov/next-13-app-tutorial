import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartType } from "@/types/global";

export interface CartStateType {
  id: number;
  totalCoast: number;
}

const initialState: CartType = {
  totalCount: 0,
  totalPrice: 0,
  items: [],
  productsIds: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartType>) {
      state.totalCount = action.payload.totalCount;
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
      state.productsIds = action.payload.productsIds;
    },
  },
});

export const { setCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.CartReducer;
export const selectCartProductsIds = (state: RootState) => state.CartReducer.productsIds;
export default cartSlice.reducer;
