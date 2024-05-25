import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { FullPageLoader, LoginRoutePage } from '../../components/layout/Loaders'
import { UserContext } from './UserProvider'

import { useHDUserSession } from "../../hooks/useHDUserSession.ts";

export const ProtectedRoute = () => {
    const { currentUser, isLoading } = useContext(UserContext)
    const [data, error, loading] = useHDUserSession(currentUser);

    if (loading) {
        return <FullPageLoader />
    } else if (!currentUser || currentUser === 'Guest') {
        // return <Navigate to="login?redirect-to=/techhelpdesk" />
        // return <Navigate to="app" />
        return <LoginRoutePage />
    } else {
        return (
            <Outlet />
        )
    }

}