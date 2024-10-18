/* eslint-disable @typescript-eslint/no-explicit-any */
import jsCookie from 'js-cookie';
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IUser } from '../../../types/User/user.types';
import { IResetPassword } from '../../../types/Auth/resetPassword.types';
import { IResetPasswordBlocked } from '../../../types/User/resetPasswordBlocked.types';
import { userData, userErrors, registerUserStart, isAuthenticatedStatus, loginStart, sendEmailByResetPasswordStart, putResetPasswordStart, profileStart, putProfileUserStart, accountUnlocking, logoChange, deleteLogo, patchUpdateApplicationPasswordStart, setRecaptchaVerifiedSuccess, setRecaptchaError } from './userSlice';

//REGISTRO DE USUARIOS
export const postRegisterClient = (formData: IUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(registerUserStart(formData));
        const response = await axiosInstance.post('/user/register', formData);
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error.response?.data));
        }
    }
};

//LOGIN DE USUARIOS
export const loginUser = (loginData: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
        console.log('HOLA')
        const response = await axiosInstance.post('/auth/login', loginData);
        jsCookie.set('token', response.data.token); 
        console.log('response: ', response.data)
        dispatch(loginStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(userErrors(error.response?.data.message));
        } else {
            dispatch(userErrors(error.response?.data.message));
        }
    }
};

//VERIFICA EL TOKEN CADA QUE ENTRE A UNA RUTA PROTEGIDA
export const verifyTokenRequest = (token: string) => {
    return axiosInstance.get(`/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//ENVIO DE CORREO ELECTRONICO DE ECOPCION A USAURIO POR CAMBIO DE CONTRASEÑA
export const sendEmailByResetPassword = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(sendEmailByResetPasswordStart());
        return await axiosInstance.get(`/user/email-user?email=${email}`);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error.response?.data));
        }
    }
};

//CAMBIO DE CONTRASEÑA
export const putResetPassword = (idUser: string, passwordResetCode: string, formData: IResetPassword) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putResetPasswordStart());
        return await axiosInstance.put(`/user/reset-password/${idUser}/${passwordResetCode}`, formData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//PERFIL DE USUARIO
export const getProfileUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(profileStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(userErrors(error.response?.data.message));
        } else {
            dispatch(userErrors(error.message));
        }
    }
};

//ACTUALIZA UN USUARIO
export const putPutProfileUser = (formData: IUser, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putProfileUserStart());
        const response = await axiosInstance.put(`/user/profile-user`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data.message));
        } else {
            dispatch(userErrors(error.message));
        }
    }
};

//DESBLOQUEO DE CUENTA Y CAMBIO DE CONTRASEÑA
export const accountUnlockingUser = (idUser: string, formData: IResetPasswordBlocked) => async (dispatch: AppDispatch) => {
    try {
        dispatch(accountUnlocking());
        return await axiosInstance.put(`/user/reset-password-user-blocked/${idUser}`, formData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//CAMBIAR LA FOTO DE PERFIL
export const logoChangeUser = (formData: Partial<IUser>, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(logoChange(formData));
        const response = await axiosInstance.patch('/user/logo-user', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//ELIMINAR LA FOTO DE PERFIL
export const deleteLogoUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteLogo());
        const response = await axiosInstance.patch('/user/delete-logo', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//ACTUALIZACION DE CONTRASEÑA DE APLICACIONES
export const patchUpdateApplicationPassword = (formData: Partial<IUser>, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchUpdateApplicationPasswordStart());
        const response = await axiosInstance.patch('/user/update-application-password', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//VERIFICACION DEL reCAPTCHA
export const setRecaptchaVerified = (recaptchaToken: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.post('/auth/validate-recaptcha', { recaptchaToken });
        if (response.data.success) {
            dispatch(setRecaptchaVerifiedSuccess());
            return { success: true };
        } else {
            dispatch(setRecaptchaError('Validación fallida, reCAPTCHA inválido'));
            return { success: false };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setRecaptchaError(error.response?.data.message));
        } else {
            dispatch(setRecaptchaError(error.response?.data.message));
        }
    }
};

//LOGOUT DE USUARIOS                        
export const logoutUser = () => (dispatch: AppDispatch) => {
    jsCookie.remove('token');
    dispatch(isAuthenticatedStatus(false));
    dispatch(userData(null));
    window.location.href = "/login";
};