import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // This will hold your array of products from MongoDB
  },
  reducers: {
    // 1. Set all products (used in Home.js and ListProducts.js)
    setProducts: (state, action) => {
     const allproducts = action.payload.products || action.payload;
     state.items =allproducts;
      localStorage.setItem('allproducts',JSON.stringify(allproducts));
    },

    // 2. Add a single product (used in AddProduct.js after successful POST)
    addProductToStore: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('allproducts', JSON.stringify(state.items));
    },

    // 3. Remove product (used in ListProducts.js after successful DELETE)
    removeProductFromStore: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem('allproducts', JSON.stringify(state.items));
    },

    // 4. Update product (used after a successful PUT/PATCH request)
    updateProductInStore: (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('allproducts', JSON.stringify(state.items));
      }
    },
  },
});

export const { 
    setProducts, 
    addProductToStore, 
    removeProductFromStore, 
    updateProductInStore 
} = productSlice.actions;

export default productSlice.reducer;