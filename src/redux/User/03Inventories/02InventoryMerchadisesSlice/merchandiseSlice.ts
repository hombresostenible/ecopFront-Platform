import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMerchandise } from '../../../../types/UserPanel/03Inventories/merchandise.types';

interface MerchandiseState {
    merchandise: IMerchandise | IMerchandise[] | null;
    merchandiseOff: IMerchandise | IMerchandise[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorMerchandise: string[] | null;
}

const initialState: MerchandiseState = {
    merchandise: null,
    merchandiseOff: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorMerchandise: null,
};

const merchandiseSlice = createSlice({
    name: 'merchandise',
    initialState,
    reducers: {
        merchandiseData: (state, action: PayloadAction<IMerchandise | null>) => {
            state.loading = false;
            state.merchandise = action.payload;
        },
        errorMerchandise: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorMerchandise = action.payload;
        },
        postMerchandisetart: (state, action: PayloadAction<IMerchandise  | null>) => {
            state.loading = true;
            state.merchandise = action.payload;
            state.errorMerchandise = null;
        },
        postManyMerchandisesStart: (state, action: PayloadAction<IMerchandise[]>) => {
            state.loading = true;
            state.merchandise = action.payload;
            state.errorMerchandise = null;
        },
        getMerchandisesStart: (state, action: PayloadAction<IMerchandise>) => {
            state.loading = true;
            state.merchandise = action.payload;
            state.errorMerchandise = null;
        },
        getMerchandisesPaginatedStart: (state, action: PayloadAction<{ registers: IMerchandise[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.merchandise = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorMerchandise = null;
        },
        getMerchandiseByIdStart: (state, action: PayloadAction<IMerchandise>) => {
            state.loading = false;
            state.merchandise = action.payload;
            state.errorMerchandise = null;
        },
        getMerchandisesByBranchStart: (state, action: PayloadAction<IMerchandise[]>) => {
            state.loading = true;
            state.merchandise = action.payload;
            state.errorMerchandise = null;
        },
        getMerchandisesOffStart: (state, action: PayloadAction<IMerchandise[]>) => {
            state.loading = true;
            state.merchandiseOff = action.payload;
            state.errorMerchandise = null;
        },
        putMerchandiseStart: (state) => {
            state.loading = true;
            state.errorMerchandise = null;
        },
        putManyMerchandisesStart: (state, action: PayloadAction<IMerchandise[]>) => {
            state.loading = true;
            state.merchandise = action.payload;
            state.errorMerchandise = null;
        },
        patchMerchandiseStart: (state) => {
            state.loading = true;
            state.errorMerchandise = null;
        },
        patchAddInventoryMerchandiseStart: (state) => {
            state.loading = true;
            state.errorMerchandise = null;
        },
        deleteMerchandiseStart: (state) => {
            state.loading = true;
            state.errorMerchandise = null;
        },
    },
});

export const { merchandiseData, errorMerchandise, postMerchandisetart, postManyMerchandisesStart, getMerchandisesStart, getMerchandisesPaginatedStart, getMerchandiseByIdStart, getMerchandisesByBranchStart, getMerchandisesOffStart, putMerchandiseStart, putManyMerchandisesStart, patchMerchandiseStart, patchAddInventoryMerchandiseStart, deleteMerchandiseStart } = merchandiseSlice.actions;
export default merchandiseSlice.reducer;