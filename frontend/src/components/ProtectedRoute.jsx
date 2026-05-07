// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';


// const ProtectedRoute = ({children,permitterroles}) => {
//     const { isAuthenticated } = useSelector((state) => state.auth);
//     const user=useSelector((state)=>state.auth.user);
//    if (!isAuthenticated) {
//     return <Navigate to="/login" />;
// }
//     if(!user){
//         return <Navigate to='/login' replace />
//     } 
//     if (isAuthenticated ||!permitterroles.includes(user?.role)) 
//     return children;
// };
// export default ProtectedRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, permittedRoles }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // 1. If not logged in, send to login page
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // 2. If roles are specified, check if user has permission
    // Example: permittedRoles = ['admin', 'recruiter']
    if (permittedRoles && !permittedRoles.includes(user?.role)) {
        // Redirect to a "Not Authorized" page or Home if they don't have the rank
        return <Navigate to="/" replace />;
    }

    // 3. If they pass all checks, render the protected content
    return children;
};

export default ProtectedRoute;