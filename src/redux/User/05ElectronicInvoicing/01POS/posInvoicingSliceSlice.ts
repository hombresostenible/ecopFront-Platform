import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPosInvoicing } from '../../../../types/User/posInvoicing.types';

interface PosInvoicingSliceState {
    posInvoicingSlice: IPosInvoicing | IPosInvoicing[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorPosInvoicingSlice: string[] | null;
}

const initialState: PosInvoicingSliceState = {
    posInvoicingSlice: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorPosInvoicingSlice: null,
};

const posInvoicingSlice = createSlice({
    name: 'posInvoicingSlice',
    initialState,
    reducers: {
        // SETEA EL ESTADO
        posInvoicingSliceData: (state, action: PayloadAction<IPosInvoicing[] | null>) => {
            state.loading = false;
            state.posInvoicingSlice = action.payload;
        },
        // SETEA LOS ERRRES EL ESTADO
        errorPosInvoicingSlice: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorPosInvoicingSlice = action.payload;
        },
        // CREA UNA FACTURA POS
        postPosInvoicingSliceStart: (state) => {
            state.loading = true;
            state.errorPosInvoicingSlice = null;
        },
        // OBTIENE TODAS LAS FACTURAS POS
        getPosInvoicingSliceStart: (state, action: PayloadAction<IPosInvoicing>) => {
            state.loading = true;
            state.posInvoicingSlice = action.payload;
            state.errorPosInvoicingSlice = null;
        },
        // OBTIENE TODAS LAS FACTURAS POS PAGINADAS
        getPosInvoicingSlicePaginatedStart: (state, action: PayloadAction<{ registers: IPosInvoicing[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.posInvoicingSlice = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorPosInvoicingSlice = null;
        },
        // OBTIENE UNA FACTURA POS POR ID
        getPosInvoicingSliceByIdStart: (state, action: PayloadAction<IPosInvoicing>) => {
            state.loading = false;
            state.posInvoicingSlice = action.payload;
            state.errorPosInvoicingSlice = null;
        },
        // ACTUALIZA UNA FACTURA POS
        putPosInvoicingSliceStart: (state) => {
            state.loading = true;
            state.errorPosInvoicingSlice = null;
        },
        // ELIMINA UNA FACTURA POS
        deletePosInvoicingSliceStart: (state) => {
            state.loading = true;
            state.errorPosInvoicingSlice = null;
        },
    },
});

export const { posInvoicingSliceData, errorPosInvoicingSlice, postPosInvoicingSliceStart, getPosInvoicingSliceStart, getPosInvoicingSlicePaginatedStart, getPosInvoicingSliceByIdStart, putPosInvoicingSliceStart, deletePosInvoicingSliceStart } = posInvoicingSlice.actions;
export default posInvoicingSlice.reducer;