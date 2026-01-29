import React from 'react'
import { AuthContext } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
const ProtectedRoutes = ({ children, role }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" />
    }
    if (role && user.roles[0].name.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/unauthorized" />
    }
    return  <Outlet />;
}

export default ProtectedRoutes