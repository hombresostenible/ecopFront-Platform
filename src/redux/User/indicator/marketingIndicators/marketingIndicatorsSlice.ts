/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarketingIndicatorsState {
    customerAcquisition: any;                   //
    customerAcquisitionByBranch: any;           //
    customerRetention: any;                     //
    customerRetentionByBranch: any;             //
    customerDigital: any;                       //
    customerDigitalByBranch: any;               //
    loading: boolean;
    errorMarketingIndicators: string[] | null;
}


const initialState: MarketingIndicatorsState = {
    customerAcquisition: null,
    customerAcquisitionByBranch: null,
    customerRetention: null,
    customerRetentionByBranch: null,
    customerDigital: null,
    customerDigitalByBranch: null,
    loading: false,
    errorMarketingIndicators: null,
};

const marketingIndicatorssSlice = createSlice({
    name: 'marketingIndicator',
    initialState,
    reducers: {
        errorMarketingIndicators: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorMarketingIndicators = action.payload;
        },
        getCustomerAcquisitionStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.customerAcquisition = action.payload;
            state.errorMarketingIndicators = null;
        },
        getCustomerAcquisitionByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.customerAcquisitionByBranch = action.payload;
            state.errorMarketingIndicators = null;
        },
        getCustomerRetentionStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.customerRetention = action.payload;
            state.errorMarketingIndicators = null;
        },
        getCustomerRetentionByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.customerRetentionByBranch = action.payload;
            state.errorMarketingIndicators = null;
        },
        getCustomerDigitalStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.customerDigital = action.payload;
            state.errorMarketingIndicators = null;
        },
        getCustomerDigitalByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.customerDigitalByBranch = action.payload;
            state.errorMarketingIndicators = null;
        },
    },
});

export const { 
    errorMarketingIndicators,
    getCustomerAcquisitionStart,
    getCustomerAcquisitionByBranchStart,
    getCustomerRetentionStart,
    getCustomerRetentionByBranchStart,
    getCustomerDigitalStart,
    getCustomerDigitalByBranchStart,
 } = marketingIndicatorssSlice.actions;
export default marketingIndicatorssSlice.reducer;