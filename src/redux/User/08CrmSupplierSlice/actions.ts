/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { ICrmSupplier } from '../../../types/UserPanel/08CrmSupplierSlice/crmSupplier.types';
import { crmSupplierData, errorCrmSupplier, postCrmSupplierStart, postManyCrmSuppliersStart, getCrmSuppliersStart, getCrmSuppliersPaginatedStart, getCrmSupplierByIdStart, getCrmSuppliersByBranchStart, putCrmSupplierStart, deleteCrmSupplierStart, sendEmailCRMSupplierStart } from './crmSupplierSlice';

//CREAR DE UN PROVEEDOR
export const postCrmSupplier = (formData: ICrmSupplier, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postCrmSupplierStart(formData));
        const response = await axiosInstance.post('/crm-supplier', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//CREAR MUCHOS PROVEEDORES
export const postManyCrmSuppliers = (formData: ICrmSupplier[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyCrmSuppliersStart(formData));
        const response = await axiosInstance.post('/crm-supplier/create-many', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTIENE TODOS LOS PROVEEDORES DEL USER
export const getCrmSuppliers = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/crm-supplier', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSuppliersStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTENER TODOS LOS PROVEEDORES PARA RENDERIZARLOS EN LA TABLA DE CONSULTA
export const getCrmSuppliersPaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crm-supplier/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSuppliersPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTIENE UN PROVEEDOR POR ID DEL USER
export const getCrmSupplierById = (idCrmSupplier: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crm-supplier/${idCrmSupplier}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSupplierByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTIENE TODOS LOS PROVEEDORES POR SEDE DEL USER
export const getCrmSuppliersByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crm-supplier/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSuppliersByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//ACTUALIZA UN PROVEEDOR DEL USER
export const putCrmSupplier = (idCrmSupplier: string, formData: ICrmSupplier, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putCrmSupplierStart());
        const response = await axiosInstance.put(`/crm-supplier/${idCrmSupplier}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//ELIMINA UN PROVEEDOR DEL USER
export const deleteCrmSupplier = (idCrmSupplier: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteCrmSupplierStart());
        const response = await axiosInstance.delete(`/crm-supplier/${idCrmSupplier}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//ENVIA CORREO ELECTRONICO A UN PROVEEDOR REGISTRADO EN CRM SUPPLIERS
export const sendEmailCRMSupplier = (sendEmailData: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(sendEmailCRMSupplierStart());
        return await axiosInstance.post(`/user/send-email`, sendEmailData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data));
        } else {
            dispatch(errorCrmSupplier(error));
        }
    }
};