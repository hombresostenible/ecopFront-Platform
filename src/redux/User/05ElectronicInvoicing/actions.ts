/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IBranch } from '../../../types/User/branch.types';
import { electronicInvoicingData, errorElectronicInvoicing, postElectronicInvoicingStart, getElectronicInvoicingStart, getElectronicInvoicingPaginatedStart, getElectronicInvoicingByIdStart, putElectronicInvoicingStart, deleteElectronicInvoicingStart } from './electronicInvoicingSlice';

// CREA UNA FACTURA ELECTRONICA
export const postElectronicInvoicing = (formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postElectronicInvoicingStart());
        const response = await axiosInstance.post(`/electronic-invoicing`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(electronicInvoicingData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorElectronicInvoicing(error.response?.data.message));
        } else {
            dispatch(errorElectronicInvoicing(error.message));
        }
    }
};

// OBTIENE TODAS LAS FACTURAS ELECTRONICAS
export const getElectronicInvoicing = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getElectronicInvoicingStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorElectronicInvoicing(error.response?.data.message));
        } else {
            dispatch(errorElectronicInvoicing(error.message));
        }
    }
};

// OBTIENE TODAS LAS FACTURAS ELECTRONICAS PAGINADAS
export const getElectronicInvoicingPaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getElectronicInvoicingPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorElectronicInvoicing(error.response?.data.message));
        } else {
            dispatch(errorElectronicInvoicing(error.message));
        }
    }
};

// OBTIENE UNA FACTURA ELECTRONICA POR ID
export const getElectronicInvoicingById = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getElectronicInvoicingByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorElectronicInvoicing(error.response?.data.message));
        } else {
            dispatch(errorElectronicInvoicing(error.message));
        }
    }
};

// ACTUALIZA UNA FACTURA ELECTRONICA
export const putElectronicInvoicing = (idBranch: string, formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putElectronicInvoicingStart());
        const response = await axiosInstance.put(`/branch/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(electronicInvoicingData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorElectronicInvoicing(error.response?.data.message));
        } else {
            dispatch(errorElectronicInvoicing(error.message));
        }
    }
};

// ELIMINA UNA FACTURA ELECTRONICA
export const deleteElectronicInvoicing = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteElectronicInvoicingStart());
        const response = await axiosInstance.delete(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(electronicInvoicingData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorElectronicInvoicing(error.response?.data.message));
        } else {
            dispatch(errorElectronicInvoicing(error.message));
        }
    }
};