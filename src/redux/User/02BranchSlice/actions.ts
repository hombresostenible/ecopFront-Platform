/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IBranch } from '../../../types/UserPanel/02Branch/branch.types';
import { branchData, errorBranch, postBranchStart, postManyBranchesStart, getBranchesStart, getBranchesPaginatedStart, getBranchByIdStart, putBranchStart, deleteBranchStart } from './branchSlice';

//CREAR DE UNA SEDE
export const postBranch = (formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postBranchStart());
        const response = await axiosInstance.post(`/branch`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//CREAR MUCHAS SEDES
export const postManyBranch = (formData: IBranch[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyBranchesStart(formData));
        const response = await axiosInstance.post('/branch/create-many', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//OBTENER TODAS LAS SEDES
export const getBranches = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBranchesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//OBTENER TODAS LAS SEDES PAGINADAS PARA RENDERIZARLAS EN LA TABLA DE CONSULTA
export const getBranchesPaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBranchesPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//OBTENER UNA SEDE POR ID
export const getBranchById = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBranchByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//ACTUALIZA UNA SEDE
export const putBranch = (idBranch: string, formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putBranchStart());
        const response = await axiosInstance.put(`/branch/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//ELIMINA UNA SEDE
export const deleteBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteBranchStart());
        const response = await axiosInstance.delete(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};