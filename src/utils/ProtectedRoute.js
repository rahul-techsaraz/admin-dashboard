import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {isUserAuthenticated} = useSelector((state) => state.user);
    let location = useLocation();

    if(!isUserAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;