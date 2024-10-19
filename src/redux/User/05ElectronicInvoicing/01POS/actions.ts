/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../../store';
import axiosInstance from '../../../../api/axios';
import { IPosInvoicing } from '../../../../types/User/posInvoicing.types';
import { posInvoicingSliceData, errorPosInvoicingSlice, postPosInvoicingSliceStart, getPosInvoicingSliceStart, getPosInvoicingSlicePaginatedStart, getPosInvoicingSliceByIdStart, putPosInvoicingSliceStart, deletePosInvoicingSliceStart } from './posInvoicingSliceSlice';

// CREA UNA FACTURA POS
export const postPosInvoicingSlice = (formData: IPosInvoicing, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postPosInvoicingSliceStart());
        const response = await axiosInstance.post(`/pos-invoicing`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(posInvoicingSliceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorPosInvoicingSlice(error.response?.data.message));
        } else {
            dispatch(errorPosInvoicingSlice(error.message));
        }
    }
};

// OBTIENE TODAS LAS FACTURAS POS
export const getPosInvoicingSlice = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/pos-invoicing`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getPosInvoicingSliceStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorPosInvoicingSlice(error.response?.data.message));
        } else {
            dispatch(errorPosInvoicingSlice(error.message));
        }
    }
};

// OBTIENE TODAS LAS FACTURAS POS PAGINADAS
export const getPosInvoicingSlicePaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/pos-invoicing/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getPosInvoicingSlicePaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorPosInvoicingSlice(error.response?.data.message));
        } else {
            dispatch(errorPosInvoicingSlice(error.message));
        }
    }
};

// OBTIENE UNA FACTURA POS POR ID
export const getPosInvoicingSliceById = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/pos-invoicing/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getPosInvoicingSliceByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorPosInvoicingSlice(error.response?.data.message));
        } else {
            dispatch(errorPosInvoicingSlice(error.message));
        }
    }
};

// ACTUALIZA UNA FACTURA POS
export const putPosInvoicingSlice = (idBranch: string, formData: IPosInvoicing, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putPosInvoicingSliceStart());
        const response = await axiosInstance.put(`/pos-invoicing/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(posInvoicingSliceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorPosInvoicingSlice(error.response?.data.message));
        } else {
            dispatch(errorPosInvoicingSlice(error.message));
        }
    }
};

// ELIMINA UNA FACTURA POS
export const deletePosInvoicingSlice = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deletePosInvoicingSliceStart());
        const response = await axiosInstance.delete(`/pos-invoicing/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(posInvoicingSliceData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorPosInvoicingSlice(error.response?.data.message));
        } else {
            dispatch(errorPosInvoicingSlice(error.message));
        }
    }
};