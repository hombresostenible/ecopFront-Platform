/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FinantialIndicatorState {
    energyConsumption: any;                     //
    energyConsumptionByBranch: any;             //
    waterConsumption: any;                      //
    waterConsumptionByBranch: any;              //
    loading: boolean;
    errorSustainabilityIndicators: string[] | null;
}

const initialState: FinantialIndicatorState = {
    energyConsumption: null,
    energyConsumptionByBranch: null,
    waterConsumption: null,
    waterConsumptionByBranch: null,
    loading: false,
    errorSustainabilityIndicators: null,
};

const finantialIndicatorsSlice = createSlice({
    name: 'sustainabilityIndicators',
    initialState,
    reducers: {
        errorSustainabilityIndicators: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorSustainabilityIndicators = action.payload;
        },
        getEnergyConsumptionStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.energyConsumption = action.payload;
            state.errorSustainabilityIndicators = null;
        },
        getEnergyConsumptionByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.energyConsumptionByBranch = action.payload;
            state.errorSustainabilityIndicators = null;
        },
        getWaterConsumptionStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.waterConsumption = action.payload;
            state.errorSustainabilityIndicators = null;
        },
        getWaterConsumptionByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.waterConsumptionByBranch = action.payload;
            state.errorSustainabilityIndicators = null;
        },
    },
});

export const {
    errorSustainabilityIndicators,
    getEnergyConsumptionStart,
    getEnergyConsumptionByBranchStart,
    getWaterConsumptionStart,
    getWaterConsumptionByBranchStart,
} = finantialIndicatorsSlice.actions;
export default finantialIndicatorsSlice.reducer;