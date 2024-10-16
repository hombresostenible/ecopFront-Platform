/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountsPayable } from '../../../../types/User/accountsPayable.types';
import { IAccountsReceivable } from '../../../../types/User/accountsReceivable.types';

interface FinantialIndicatorState {
    salesPerPeriod: any;                        //
    expensesPerPeriod: any;                     //
    allTransactionsPerPeriod: any;              //
    accountsPayable: IAccountsPayable | IAccountsPayable[] | null;
    accountsReceivable: IAccountsReceivable | IAccountsReceivable[] | null;
    bestClientValue: any;                       //
    bestClientQuantity: any;                    //
    averageTicketPerPeriod: any;                //
    assetsInventory: any;                       //
    merchandisesInventory: any;                 //
    productsInventory: any;                     //
    rawmaterialsInventory: any;                 //
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorFinantialIndicator: string[] | null;
}

const initialState: FinantialIndicatorState = {
    salesPerPeriod: null,
    expensesPerPeriod: null,
    allTransactionsPerPeriod: null,
    accountsReceivable: null,
    accountsPayable: null,
    bestClientValue: null,
    bestClientQuantity: null,
    averageTicketPerPeriod: null,
    assetsInventory: null,
    merchandisesInventory: null,
    productsInventory: null,
    rawmaterialsInventory: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorFinantialIndicator: null,
};

const finantialIndicatorsSlice = createSlice({
    name: 'finantialIndicator',
    initialState,
    reducers: {
        errorFinantialIndicator: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorFinantialIndicator = action.payload;
        },
        // VENTAS DEL PERIODO
        getSalesPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.salesPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        // VENTAS DEL PERIODO POR SEDE
        getSalesPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.salesPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        // GASTOS DEL PERIODO
        getExpensesPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.expensesPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        // GASTOS DEL PERIODO POR SEDE
        getExpensesPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.expensesPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        // UTILIDAD DEL PERIODO - TODAS LAS TRANSACCIONES (GASTOS E INGRESOS)
        getAllTransactionsPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.allTransactionsPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        // UTILIDAD DEL PERIODO - TODAS LAS TRANSACCIONES (GASTOS E INGRESOS) POR SEDE
        getAllTransactionsPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.allTransactionsPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR PAGAR
        getAccountsPayableStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsPayable = action.payload;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR PAGAR CON PAGINADO
        getAccountsPayablePaginatedStart: (state, action: PayloadAction<{ registers: IAccountsPayable[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsPayable = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR PAGAR POR SEDE
        getAccountsPayableByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsPayable = action.payload;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR PAGAR POR SEDE CON PAGINADO
        getAccountsPayableByBranchPaginatedStart: (state, action: PayloadAction<{ registers: IAccountsPayable[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsPayable = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR COBRAR
        getAccountsReceivableStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsReceivable = action.payload;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR COBRAR CON PAGINADO
        getAccountsReceivablePaginatedStart: (state, action: PayloadAction<{ registers: IAccountsReceivable[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsReceivable = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR COBRAR POR SEDE
        getAccountsReceivableByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsReceivable = action.payload;
            state.errorFinantialIndicator = null;
        },
        // CUENTAS POR COBRAR POR SEDE CON PAGINADO
        getAccountsReceivableByBranchPaginatedStart: (state, action: PayloadAction<{ registers: IAccountsReceivable[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.accountsReceivable = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorFinantialIndicator = null;
        },

















        getBestClientValueStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientValue = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientValueByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientValue = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientQuantityStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientQuantity = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientQuantityByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientQuantity = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAverageTicketPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.averageTicketPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAverageTicketPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.averageTicketPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        getProductsInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.productsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getProductsInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.productsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getRawmaterialsInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.rawmaterialsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getRawmaterialsInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.rawmaterialsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAssetsInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.assetsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAssetsInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.assetsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getMerchandisesInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.merchandisesInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getMerchandisesInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.merchandisesInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
    },
});

export const {
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
    getAccountsReceivablePaginatedStart,
    getAccountsReceivableByBranchStart,
    getAccountsReceivableByBranchPaginatedStart,


    getBestClientValueStart,
    getBestClientValueByBranchStart,
    getBestClientQuantityStart,
    getBestClientQuantityByBranchStart,
    getAverageTicketPerPeriodStart,
    getAverageTicketPerPeriodByBranchStart,
    getProductsInventoryStart,
    getProductsInventoryByBranchStart,
    getRawmaterialsInventoryStart,
    getRawmaterialsInventoryByBranchStart,
    getAssetsInventoryStart,
    getAssetsInventoryByBranchStart,
    getMerchandisesInventoryStart,
    getMerchandisesInventoryByBranchStart,
} = finantialIndicatorsSlice.actions;
export default finantialIndicatorsSlice.reducer;