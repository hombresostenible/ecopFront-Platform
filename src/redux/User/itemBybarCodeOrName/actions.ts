/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { errorItemByBarCode, getItemByBarCodeStart, errorItemByName, getItemByNameStart } from './itemByBarCodeOrNameSlice';
import { IBackendItemResponse } from '../../../types/User/backendItemResponse.types';

//BUSCA UN ITEM POR CODIGO DE BARRAS EN TODAS LAS TABLAS
export const getItemByBarCode = (barCode: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        console.log('barCode: ', barCode)
        // console.log('token: ', token)
        const response = await axiosInstance.get<IBackendItemResponse>(`/all-items/bar-code/${barCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getItemByBarCodeStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorItemByBarCode(error.response?.data.message));
        } else {
            dispatch(errorItemByBarCode(error.message));
        }
    }
};



//BUSCA UN ITEM POR NOMBRE EN TODAS LAS TABLAS
export const getItemByName = (nameItem: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/all-items/name-item/query?nameItem=${nameItem}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getItemByNameStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorItemByName(error.response?.data.message));
        } else {
            dispatch(errorItemByName(error.message));
        }
    }
};
