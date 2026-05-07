import {configureStore} from '@reduxjs/toolkit';
// import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import productReducer from './productsSlice'

const store = configureStore({
    reducer: {
        cart:cartReducer,
        auth:authReducer,
        products:productReducer,
    }
});

export default store;