import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from '../pages/Signin'

const AppRoutes = () => {   
    return (
        <Routes>
          <Route path="/login" element={<Signin />} />

        </Routes>
    )
}
export default AppRoutes