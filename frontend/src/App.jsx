// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast';
import Home from './components/Home.jsx';
import { Routes } from 'react-router-dom';
import { Route,Outlet } from 'react-router-dom';
import Products from './components/Products.jsx';
import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Loginpage from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Profile from './components/Profile.jsx';
import Pagenotfound from './components/Pagenotfound.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AddProduct from './components/AddProduct.jsx';
import ListProducts from './components/ListProducts.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/productsSlice.js';
import toast from 'react-hot-toast';
import EditProduct from "./components/EditProduct.jsx";
import Unauthorized from './components/Unauthorized.jsx';
import AboutPage from './components/Aboutpage.jsx';
import Footer from './components/Footer.jsx';
import ListUsers from './components/ListUsers.jsx';
import instance from './axios/instance.js';


function App() {
  
    const dispatch = useDispatch();

  useEffect(() => {
  async function loadProducts() {
    try {
      const res = await instance.get('/product/allproducts');
      
      // 1. Extract the data based on your API structure
      const productsData = res.data.products || res;

      // 2. Dispatch the action to update the Redux store
      // Assuming 'setProducts' is your action creator from your slice
      dispatch(setProducts(productsData)); 
       toast.success(res.data?.message);


    } catch (error) {
      // 
       toast.error(error?.response?.data?.message || error.message);
    } 
  }
  loadProducts();
}, [dispatch]);
  

  return (
    <>
    <Toaster position="top-center" />
     <Header />
     <Routes>
     
        {/* <Route path="/admin" element={<AdminRoute />}>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ListProducts />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route> */}
        {/* <Route 
  path="/admin" 
  element={
    <ProtectedRoute permittedRoles={['admin']}>
      {/* This acts as the wrapper/layout for all sub-routes */}
    
    {/* </ProtectedRoute> */}
   
  <Route 
  path="/admin" 
  element={
    <ProtectedRoute permittedRoles={['admin']}>
     
      <Outlet /> 
    </ProtectedRoute>
  }
>
  <Route path="add-product" element={<AddProduct />} />
  <Route path="products" element={<ListProducts />} />
  <Route path="edit-product/:id" element={<EditProduct />} />
  <Route path="users" element={<ListUsers />} />
</Route>

  {/* These nested routes only render if ProtectedRoute allows it */}
 
<Route path='/about' element={<AboutPage/>} />
  <Route path='/' element={<Home />} />
  
  <Route path='/product/:id' element={<Products />} />
  <Route path='/cart' element={
    
    <ProtectedRoute>
    <Cart />
    </ProtectedRoute>} />
   <Route path='/profile' element={
    
    <ProtectedRoute>
    <Profile />
    </ProtectedRoute>} />  
  <Route path='/login' element={<Loginpage />} />
  <Route path='/register' element={<Register />} />

  <Route path="/unauthorized" element={<Unauthorized />} />
  <Route path='*' element={<Pagenotfound />} />
  </Routes>
  <Footer/>
    </>
  )
}

export default App
