import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartType } from "@/types/global";
import axios from "axios";

export interface CartStateType extends CartType {
  loading: boolean;
}

const initialState: CartStateType = {
  loading: false,
  totalCount: 0,
  totalPrice: 0,
  items: [],
  productsIds: [],
};

export const getCartData = createAsyncThunk("cart/getCartData", async (_) => {
  const res = await axios("/api/cart");
  return res.data;
});

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

  extraReducers: (builder) => {
    builder.addCase(getCartData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getCartData.fulfilled,
      (state, action: PayloadAction<CartType>) => {
        state.loading = false;
        state.totalCount = action.payload.totalCount;
        state.totalPrice = action.payload.totalPrice;
        state.items = action.payload.items;
        state.productsIds = action.payload.productsIds;
      }
    );
    builder.addCase(getCartData.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.CartReducer;
export const selectCartProductsIds = (state: RootState) =>
  state.CartReducer.productsIds;
export default cartSlice.reducer;
