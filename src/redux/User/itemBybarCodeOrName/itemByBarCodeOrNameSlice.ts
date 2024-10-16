import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBackendItemResponse } from '../../../types/User/backendItemResponse.types';

interface ItemByBarCodeOrNameSliceState {
    itemByBarCode: IBackendItemResponse | null;
    itemByName: IBackendItemResponse | null;
    loading: boolean;
    errorItemByBarCodeOrName: string[] | null;
}

const initialState: ItemByBarCodeOrNameSliceState = {
    itemByBarCode: null,
    itemByName: null,
    loading: false,
    errorItemByBarCodeOrName: null,
};

const itemByBarCodeOrNameSlice = createSlice({
    name: 'itemByBarCodeOrName',
    initialState,
    reducers: {
        setItemByBarCodeData: (state, action: PayloadAction<IBackendItemResponse>) => {
            state.loading = false;
            state.itemByBarCode = action.payload;
        },
        errorItemByBarCode: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorItemByBarCodeOrName = action.payload;
        },
        getItemByBarCodeStart: (state, action: PayloadAction<IBackendItemResponse>) => {
            state.loading = true;
            state.itemByBarCode = action.payload;
            state.errorItemByBarCodeOrName = null;
        },

        setItemByNameData: (state, action: PayloadAction<IBackendItemResponse>) => {
            state.loading = false;
            state.itemByName = action.payload;
        },
        errorItemByName: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorItemByBarCodeOrName = action.payload;
        },
        getItemByNameStart: (state, action: PayloadAction<IBackendItemResponse>) => {
            state.loading = true;
            state.itemByName = action.payload;
            state.errorItemByBarCodeOrName = null;
        },

    },
});

export const {
    setItemByBarCodeData,
    errorItemByBarCode,
    getItemByBarCodeStart,
    setItemByNameData,
    errorItemByName,
    getItemByNameStart
} = itemByBarCodeOrNameSlice.actions;
export default itemByBarCodeOrNameSlice.reducer;