/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../../store';
import axiosInstance from '../../../../api/axios';
import {
    errorSustainabilityIndicators,
    getEnergyConsumptionStart,
    getEnergyConsumptionByBranchStart,
    getWaterConsumptionStart,
    getWaterConsumptionByBranchStart,
} from './sustainabilityIndicatorsSlice';

//
export const getEnergyConsumption = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/energyConsumption', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getEnergyConsumptionStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorSustainabilityIndicators(error.response?.data.message));
        } else {
            dispatch(errorSustainabilityIndicators(error.message));
        }
    }
};

//
export const getEnergyConsumptionByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/energyConsumptionBranch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getEnergyConsumptionByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorSustainabilityIndicators(error.response?.data.message));
        } else {
            dispatch(errorSustainabilityIndicators(error.message));
        }
    }
};

//
export const getWaterConsumption = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/waterConsumption', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getWaterConsumptionStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorSustainabilityIndicators(error.response?.data.message));
        } else {
            dispatch(errorSustainabilityIndicators(error.message));
        }
    }
};

//
export const getWaterConsumptionByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/waterConsumptionBranch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getWaterConsumptionByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorSustainabilityIndicators(error.response?.data.message));
        } else {
            dispatch(errorSustainabilityIndicators(error.message));
        }
    }
};