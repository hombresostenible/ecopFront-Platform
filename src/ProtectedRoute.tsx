/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedStatus } from './redux/User/userSlice/userSlice';
import { verifyTokenRequest } from './redux/User/userSlice/actions';
import { RootState } from './redux/store';

function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    
    useEffect(() => {
        const checkUserAuthentication = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await verifyTokenRequest(token);
                    if (response && response.status === 200) {
                        dispatch(isAuthenticatedStatus(true)); // Actualizar el estado de autenticación a true
                    } else {
                        dispatch(isAuthenticatedStatus(false)); // Actualizar el estado de autenticación a false
                    }
                } catch (error) {
                    console.error('Error al verificar el token:', error);
                    dispatch(isAuthenticatedStatus(false)); // Actualizar el estado de autenticación a false
                }
            } else {
                dispatch(isAuthenticatedStatus(false)); // Actualizar el estado de autenticación a false
            }
            setLoading(false);
        };    
        checkUserAuthentication();
    }, []);

    if (!loading && !isAuthenticated) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        return <Navigate to="/login" replace />;
    }

    // Si el usuario está autenticado, permite el acceso a la ruta protegida
    return <Outlet />;
}

export default ProtectedRoute;