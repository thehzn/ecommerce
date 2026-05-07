import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth);

    // Check if user exists and has the 'admin' role from your Mongoose DB
    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;