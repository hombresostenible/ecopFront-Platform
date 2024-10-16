import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICrmSupplier } from '../../../types/User/crmSupplier.types';

interface CrmSupplierState {
    crmSupplier: ICrmSupplier | ICrmSupplier[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorCrmSupplier: string[] | null;
}

const initialState: CrmSupplierState = {
    crmSupplier: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorCrmSupplier: null,
};

const crmSupplierSlice = createSlice({
    name: 'crmSupplier',
    initialState,
    reducers: {
        crmSupplierData: (state, action: PayloadAction<ICrmSupplier | null>) => {
            state.loading = false;
            state.crmSupplier = action.payload;
        },
        errorCrmSupplier: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorCrmSupplier = action.payload;
        },
        postCrmSupplierStart: (state, action: PayloadAction<ICrmSupplier  | null>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        postManyCrmSuppliersStart: (state, action: PayloadAction<ICrmSupplier[]>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        getCrmSuppliersStart: (state, action: PayloadAction<ICrmSupplier>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        getCrmSuppliersPaginatedStart: (state, action: PayloadAction<{ registers: ICrmSupplier[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.crmSupplier = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorCrmSupplier = null;
        },
        getCrmSupplierByIdStart: (state, action: PayloadAction<ICrmSupplier>) => {
            state.loading = false;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        getCrmSuppliersByBranchStart: (state, action: PayloadAction<ICrmSupplier[]>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        putCrmSupplierStart: (state) => {
            state.loading = true;
            state.errorCrmSupplier = null;
        },
        deleteCrmSupplierStart: (state) => {
            state.loading = true;
            state.errorCrmSupplier = null;
        },
        sendEmailCRMSupplierStart: (state) => {
            state.loading = false;
            state.errorCrmSupplier = null;
        },
    },
});

export const { crmSupplierData, errorCrmSupplier, postCrmSupplierStart, postManyCrmSuppliersStart, getCrmSuppliersStart, getCrmSuppliersPaginatedStart, getCrmSupplierByIdStart, getCrmSuppliersByBranchStart, putCrmSupplierStart, deleteCrmSupplierStart, sendEmailCRMSupplierStart } = crmSupplierSlice.actions;
export default crmSupplierSlice.reducer;