import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountsBook } from '../../../types/User/accountsBook.types';

interface UserState {
    accountsBook: IAccountsBook | IAccountsBook[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorAccountsBook: string[] | null;
}

const initialState: UserState = {
    accountsBook: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorAccountsBook: null,
};

const accountsBookSlice = createSlice({
    name: 'accountsBook',
    initialState,
    reducers: {
        accountsBookData: (state, action: PayloadAction<IAccountsBook | null>) => {
            state.loading = false;
            state.accountsBook = action.payload;
        },
        errorAccountsBook: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorAccountsBook = action.payload;
        },
        postAccountsBookStart: (state, action: PayloadAction<IAccountsBook  | null>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBooksStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getAccountsBookByBranchStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getAccountsBooksIncomesStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getAccountsBooksIncomesByBranchStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getAccountsBooksExpensesStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getAccountsBooksExpensesByBranchStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getUnapprovedRecordsStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getUnapprovedRecordsByBranchStart: (state, action: PayloadAction<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsBook = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorAccountsBook = null;
        },
        getAccountsBookByIdStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = false;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        patchApproveRecordStart: (state) => {
            state.loading = true;
            state.errorAccountsBook = null;
        },
        putAccountsBookStart: (state) => {
            state.loading = true;
            state.errorAccountsBook = null;
        },
        deleteAccountsBookStart: (state) => {
            state.loading = true;
            state.errorAccountsBook = null;
        },
    },
});

export const {
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
    deleteAccountsBookStart
} = accountsBookSlice.actions;
export default accountsBookSlice.reducer;