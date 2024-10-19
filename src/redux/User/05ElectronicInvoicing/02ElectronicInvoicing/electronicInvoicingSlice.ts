import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IElectronicInvoicing } from '../../../../types/User/electronicInvoicing.types';

interface ElectronicInvoicingState {
    electronicInvoicing: IElectronicInvoicing | IElectronicInvoicing[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorElectronicInvoicing: string[] | null;
}

const initialState: ElectronicInvoicingState = {
    electronicInvoicing: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorElectronicInvoicing: null,
};

const electronicInvoicingSlice = createSlice({
    name: 'electronicInvoicing',
    initialState,
    reducers: {
        // SETEA EL ESTADO
        electronicInvoicingData: (state, action: PayloadAction<IElectronicInvoicing[] | null>) => {
            state.loading = false;
            state.electronicInvoicing = action.payload;
        },
        // SETEA LOS ERRRES EL ESTADO
        errorElectronicInvoicing: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorElectronicInvoicing = action.payload;
        },
        // CREA UNA FACTURA ELECTRONICA
        postElectronicInvoicingStart: (state) => {
            state.loading = true;
            state.errorElectronicInvoicing = null;
        },
        // OBTIENE TODAS LAS FACTURAS ELECTRONICAS
        getElectronicInvoicingStart: (state, action: PayloadAction<IElectronicInvoicing>) => {
            state.loading = true;
            state.electronicInvoicing = action.payload;
            state.errorElectronicInvoicing = null;
        },
        // OBTIENE TODAS LAS FACTURAS ELECTRONICAS PAGINADAS
        getElectronicInvoicingPaginatedStart: (state, action: PayloadAction<{ registers: IElectronicInvoicing[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.electronicInvoicing = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorElectronicInvoicing = null;
        },
        // OBTIENE UNA FACTURA ELECTRONICA POR ID
        getElectronicInvoicingByIdStart: (state, action: PayloadAction<IElectronicInvoicing>) => {
            state.loading = false;
            state.electronicInvoicing = action.payload;
            state.errorElectronicInvoicing = null;
        },
        // ACTUALIZA UNA FACTURA ELECTRONICA
        putElectronicInvoicingStart: (state) => {
            state.loading = true;
            state.errorElectronicInvoicing = null;
        },
        // ELIMINA UNA FACTURA ELECTRONICA
        deleteElectronicInvoicingStart: (state) => {
            state.loading = true;
            state.errorElectronicInvoicing = null;
        },
    },
});

export const { electronicInvoicingData, errorElectronicInvoicing, postElectronicInvoicingStart, getElectronicInvoicingStart, getElectronicInvoicingPaginatedStart, getElectronicInvoicingByIdStart, putElectronicInvoicingStart, deleteElectronicInvoicingStart } = electronicInvoicingSlice.actions;
export default electronicInvoicingSlice.reducer;