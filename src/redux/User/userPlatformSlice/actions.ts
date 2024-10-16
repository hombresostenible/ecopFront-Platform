/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IUserPlatform } from '../../../types/User/userPlatform.types';
import { userPlatformData, errorUserPlatform, postUserPlatformStart, postManyUsersPlatformStart, getUsersPlatformStart, getUserPlatformByIdStart, getUserPlatformsByBranchStart, putUserPlatformStart, putManyUsersPlatformStart, deleteUserPlatformStart } from './userPlatformSlice';

//CREAR DE UN USUARIO DE PLATAFORMA
export const postUserPlatform = (formData: IUserPlatform, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postUserPlatformStart(formData));
        const response = await axiosInstance.post('/user-platform', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//CREAR MUCHOS USUARIOS DE PLATAFORMA
export const postManyUsersPlatform = (formData: IUserPlatform[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyUsersPlatformStart(formData));
        const response = await axiosInstance.post('/user-platform/create-many', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//OBTIENE TODOS LOS USUARIOS DE PLATAFORMA
export const getUsersPlatform = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/user-platform', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUsersPlatformStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//OBTIENE UN USUARIO DE PLATAFORMA POR ID
export const getUserPlatformById = (idUserPlatform: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/user-platform/${idUserPlatform}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUserPlatformByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//OBTIENE TODOS LOS USUARIOS DE PLATAFORMA DEL USER POR SEDE
export const getUserPlatformsByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/user-platform/users-platform-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUserPlatformsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//ACTUALIZA UN USUARIO DE PLATAFORMA
export const putUserPlatform = (token: string, formData: IUserPlatform) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putUserPlatformStart());
        const response = await axiosInstance.put(`/user-platform`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//ACTUALIZA MUCHOS USUARIOS DE PLATAFORMA DEL USER
export const putManyUserPlatform = (formData: IUserPlatform[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putManyUsersPlatformStart(formData));
        const response = await axiosInstance.put('/user-platform/updateMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//ELIMINA UN USUARIO DE PLATAFORMA DEL USER
export const deleteUserPlatform = (idUserPlatform: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteUserPlatformStart());
        const response = await axiosInstance.delete(`/user-platform/${idUserPlatform}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};