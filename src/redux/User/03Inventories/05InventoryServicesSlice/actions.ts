/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../../store';
import axiosInstance from '../../../../api/axios';
import { IService } from '../../../../types/User/services.types';
import { serviceData, errorService, postServiceStart, postManyServicesStart, getServicesStart, getServicesPaginatedStart, getServiceByIdStart, getServicesByBranchStart, putServiceStart, putManyServicesStart, patchServiceStart, deleteServiceStart } from './serviceSlice';

//CREAR DE UN EQUIPO, HERRAMIENTA O MAQUINA
export const postService = (formData: IService, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postServiceStart(formData));
        const response = await axiosInstance.post('/service', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(serviceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//CREAR MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS
export const postManyServices = (formData: IService[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyServicesStart(formData));
        const response = await axiosInstance.post('/service/create-many', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(serviceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//OBTIENE TODOS LOS SERVICIOS
export const getServices = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/service', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getServicesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//OBTENER TODOS LOS SERVICIOS PARA RENDERIZARLOS EN LA TABLA DE CONSULTA
export const getServicesPaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/service/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getServicesPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//OBTIENE UN EQUIPO, HERRAMIENTA O MAQUINA POR ID
export const getServiceById = (idService: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/service/${idService}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getServiceByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER POR SEDE
export const getServicesByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/service/services-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getServicesByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//ACTUALIZA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putService = (idService: string, formData: IService, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putServiceStart());
        const response = await axiosInstance.put(`/service/${idService}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(serviceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//ACTUALIZA MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putManyServices = (formData: IService[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putManyServicesStart(formData));
        const response = await axiosInstance.put('/service/updateMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(serviceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};

//DA DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchService = (idService: string, formData: IService, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchServiceStart());
        const response = await axiosInstance.patch(`/service/${idService}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(serviceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
}

//ELIMINA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteService = (idService: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteServiceStart());
        const response = await axiosInstance.delete(`/service/${idService}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(serviceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorService(error.response?.data.message));
        } else {
            dispatch(errorService(error.message));
        }
    }
};