/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IAccountsBook } from '../../../types/UserPanel/04Accounts/accountsBook.types';
import {
    accountsBookData,
    errorAccountsBook,
    postAccountsBookStart,
    getAccountsBooksStart,
    getAccountsBookByBranchStart,
    getAccountsBooksIncomesStart,
    getAccountsBooksIncomesByBranchStart,
    getAccountsBooksExpensesStart,
    getAccountsBooksExpensesByBranchStart,
    

    

    getUnapprovedRecordsStart,
    
    getUnapprovedRecordsByBranchStart,
    getAccountsBookByIdStart,
    patchApproveRecordStart,
    putAccountsBookStart,
    deleteAccountsBookStart } from './accountsBookSlice';

//CREAR DE UN REGISTRO EN EL LIBRO DIARIO
export const postAccountsBook = (formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postAccountsBookStart(formData));
        const response = await axiosInstance.post('/accounts-book', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTRO DEL LIBRO DIARIO PAGINADOS PARA RENDERIZARLOS EN LA TABLA DE CONSULTA
export const getAccountsBooks = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTROS DEL LIBRO DIARIO POR SEDE
export const getAccountsBookByBranch = (idBranch: string, token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/paginated-branch/${idBranch}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookByBranchStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};                    

//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
export const getAccountsBooksIncomes = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/incomes?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksIncomesStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
export const getAccountsBooksIncomesByBranch = (idBranch: string, token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/incomes-branch/${idBranch}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksIncomesByBranchStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTRO DE GASTO DEL LIBRO DIARIO
export const getAccountsBooksExpenses = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/expenses?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksExpensesStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
export const getAccountsBooksExpensesByBranch = (idBranch: string, token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/expenses-branch/${idBranch}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksExpensesByBranchStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS INGRESOS NO APROBADOS
export const getUnapprovedRecords = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/unapproved-records?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUnapprovedRecordsStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS INGRESOS NO APROBADOS POR SEDE
export const getUnapprovedRecordsByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/incomes-not-approved/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUnapprovedRecordsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID
export const getAccountsBookById = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//APROBAR UN INGRESO PENDIENTE DE APROBAR
export const patchApproveRecord = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchApproveRecordStart());
        const response = await axiosInstance.patch(`/accounts-book/approve-record/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
}

//ACTUALIZA UN REGISTRO DEL LIBRO DIARIO
export const putAccountsBook = (idAccountsBook: string, formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putAccountsBookStart());
        const response = await axiosInstance.put(`/accounts-book/${idAccountsBook}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//ELIMINA UN REGISTRO DEL LIBRO DIARIO
export const deleteAccountsBook = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAccountsBookStart());
        const response = await axiosInstance.delete(`/accounts-book/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};