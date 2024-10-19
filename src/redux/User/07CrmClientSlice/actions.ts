/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { ICrmClient } from '../../../types/UserPanel/07CrmClientSlice/crmClient.types';
import { crmClientData, errorCrmClient, postCrmClientStart, postManyCrmClientsStart, getCrmClientsStart, getCrmClientsPaginatedStart, getCrmClientByIdStart, getCrmClientsByBranchStart, putCrmClientStart, deleteCrmClientStart, sendEmailCRMClientStart } from './crmClientSlice';

//CREAR DE UN CLIENTE
export const postCrmClient = (formData: ICrmClient, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postCrmClientStart(formData));
        const response = await axiosInstance.post('/crm-client', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//CREAR MUCHOS CLIENTES
export const postManyCrmClients = (formData: ICrmClient[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyCrmClientsStart(formData));
        const response = await axiosInstance.post('/crm-client/create-many', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTIENE TODOS LOS CLIENTES DEL USER
export const getCrmClients = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/crm-client', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientsStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTENER TODOS LOS CLIENTES PARA RENDERIZARLOS EN LA TABLA DE CONSULTA
export const getCrmClientsPaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crm-client/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientsPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTIENE UN CLIENTE POR ID DEL USER
export const getCrmClientById = (idCrmClient: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crm-client/${idCrmClient}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTIENE TODOS LOS CLIENTES POR SEDE DEL USER
export const getCrmClientsByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crm-client/crm-client-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//ACTUALIZA UN CLIENTE DEL USER
export const putCrmClient = (idCrmClient: string, formData: ICrmClient, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putCrmClientStart());
        const response = await axiosInstance.put(`/crm-client/${idCrmClient}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//ELIMINA UN CLIENTE DEL USER
export const deleteCrmClient = (idCrmClient: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteCrmClientStart());
        const response = await axiosInstance.delete(`/crm-client/${idCrmClient}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//ENVIA CORREO ELECTRONICO A UN CLIENTE REGISTRADO EN CRM CLIENTS
export const sendEmailCRMClient = (sendEmailData: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(sendEmailCRMClientStart());
        return await axiosInstance.post(`/user/send-email`, sendEmailData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data));
        } else {
            dispatch(errorCrmClient(error));
        }
    }
};