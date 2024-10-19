import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBranch } from '../../../types/UserPanel/02Branch/branch.types';

interface BranchState {
    branch: IBranch | IBranch[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorBranch: string[] | null;
}

const initialState: BranchState = {
    branch: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorBranch: null,
};

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        branchData: (state, action: PayloadAction<IBranch[] | null>) => {
            state.loading = false;
            state.branch = action.payload;
        },
        errorBranch: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorBranch = action.payload;
        },
        postBranchStart: (state) => {
            state.loading = true;
            state.errorBranch = null;
        },
        postManyBranchesStart: (state, action: PayloadAction<IBranch[]>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        getBranchesStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        getBranchesPaginatedStart: (state, action: PayloadAction<{ registers: IBranch[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.branch = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorBranch = null;
        },
        getBranchByIdStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = false;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        putBranchStart: (state) => {
            state.loading = true;
            state.errorBranch = null;
        },
        deleteBranchStart: (state) => {
            state.loading = true;
            state.errorBranch = null;
        },
    },
});

export const { branchData, errorBranch, postBranchStart, postManyBranchesStart, getBranchesStart, getBranchesPaginatedStart, getBranchByIdStart, putBranchStart, deleteBranchStart } = branchSlice.actions;
export default branchSlice.reducer;