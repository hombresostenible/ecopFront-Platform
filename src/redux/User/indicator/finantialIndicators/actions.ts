/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../../store';
import axiosInstance from '../../../../api/axios';
import {
    errorFinantialIndicator,
    getSalesPerPeriodStart,
    getSalesPerPeriodByBranchStart,
    getExpensesPerPeriodStart,
    getExpensesPerPeriodByBranchStart,
    getAllTransactionsPerPeriodStart,
    getAllTransactionsPerPeriodByBranchStart,
    getAccountsPayableStart,
    getAccountsPayablePaginatedStart,
    getAccountsPayableByBranchStart,
    getAccountsPayableByBranchPaginatedStart,
    getAccountsReceivableStart,
    getAccountsReceivableByBranchStart,
    getAccountsReceivablePaginatedStart,
    getAccountsReceivableByBranchPaginatedStart,
    getBestClientValueStart,
    getBestClientValueByBranchStart,
    getBestClientQuantityStart,
    getBestClientQuantityByBranchStart,
    getAverageTicketPerPeriodStart,
    getAverageTicketPerPeriodByBranchStart,
    getAssetsInventoryStart,
    getAssetsInventoryByBranchStart,
    getMerchandisesInventoryStart,
    getMerchandisesInventoryByBranchStart,
    getProductsInventoryStart,
    getProductsInventoryByBranchStart,
    getRawmaterialsInventoryStart,
    getRawmaterialsInventoryByBranchStart,
} from './finantialIndicatorsSlice';

// VENTAS DEL PERIODO
export const getSalesPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/sales-per-period', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getSalesPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// VENTAS DEL PERIODO POR SEDE
export const getSalesPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/sales-per-period/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getSalesPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// GASTOS DEL PERIODO
export const getExpensesPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/expenses-per-period', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getExpensesPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// GASTOS DEL PERIODO POR SEDE
export const getExpensesPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/expenses-per-period/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getExpensesPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// UTILIDAD DEL PERIODO - TODAS LAS TRANSACCIONES (GASTOS E INGRESOS)
export const getAllTransactionsPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/all-transactions-per-period', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAllTransactionsPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// UTILIDAD DEL PERIODO - TODAS LAS TRANSACCIONES (GASTOS E INGRESOS) POR SEDE
export const getAllTransactionsPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/all-transactions-per-period/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAllTransactionsPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR PAGAR
export const getAccountsPayable = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/indicator-accounts-payable', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsPayableStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR PAGAR CON PAGINADO
export const getAccountsPayablePaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/accounts-payable-paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsPayablePaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR PAGAR POR SEDE
export const getAccountsPayableByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/indicator-accounts-payable/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsPayableByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR PAGAR POR SEDE CON PAGINADO
export const getAccountsPayableByBranchPaginated = (idBranch: string, token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/accounts-payable-paginated/${idBranch}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsPayableByBranchPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR COBRAR
export const getAccountsReceivable = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/indicator-accounts-receivable', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsReceivableStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR COBRAR CON PAGINADO
export const getAccountsReceivablePaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/accounts-receivable-paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsReceivablePaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR COBRAR POR SEDE
export const getAccountsReceivableByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/indicator-accounts-receivable/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsReceivableByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// CUENTAS POR COBRAR POR SEDE CON PAGINADO
export const getAccountsReceivableByBranchPaginated = (idBranch: string, token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/accounts-receivable-paginated/${idBranch}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsReceivableByBranchPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// MEJOR CLIENTE POR VALOR
export const getBestClientValue = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/best-client-value', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientValueStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// MEJOR CLIENTE POR VALOR POR SEDE
export const getBestClientValueByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/best-client-value/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientValueByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// MEJOR CLIENTE POR CANTIDAD
export const getBestClientQuantity = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/best-client-quantity', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientQuantityStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// MEJOR CLIENTE POR VALOR POR CANTIDAD
export const getBestClientQuantityByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/best-client-quantity/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientQuantityByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// TICKET PROMEDIO POR PERIODO
export const getAverageTicketPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/average-ticket-per-period', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAverageTicketPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// TICKET PROMEDIO POR PERIODO POR SEDE
export const getAverageTicketPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/average-ticket-per-period/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAverageTicketPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE EQUIPOS
export const getAssetsInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/assets-inventory', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetsInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE EQUIPOS POR SEDE
export const getAssetsInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/assets-inventory/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetsInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};
    
// INVENTARIO DE MERCANCIAS
export const getMerchandisesInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/merchandises-inventory', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandisesInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE MERCANCIAS POR SEDE
export const getMerchandisesInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/merchandises-inventory/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandisesInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE PRODUCTOS
export const getProductsInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/products-inventory', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductsInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE PRODUCTOS POR SEDE
export const getProductsInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/products-inventory/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductsInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE MATERIA PRIMA
export const getRawmaterialsInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/financial-indicator/rawmaterials-inventory', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawmaterialsInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

// INVENTARIO DE MATERIA PRIMA POR SEDE
export const getRawmaterialsInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/financial-indicator/rawmaterials-inventory/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawmaterialsInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};