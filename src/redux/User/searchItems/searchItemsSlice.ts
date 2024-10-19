import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAssets } from "../../../types/UserPanel/03Inventories/assets.types";
import { IMerchandise } from "../../../types/UserPanel/03Inventories/merchandise.types";
import { IProduct } from "../../../types/UserPanel/03Inventories/products.types";
import { IRawMaterial } from "../../../types/UserPanel/03Inventories/rawMaterial.types";
import { IService } from "../../../types/UserPanel/03Inventories/services.types";

interface searchItemsState {
    items: IAssets | IAssets[] | IMerchandise | IMerchandise[] | IProduct |IProduct[] | IRawMaterial | IRawMaterial[] | IService | IService[] | null;
    loading: boolean;
    errorItems: string[] | null;
}

const initialState: searchItemsState = {
    items: null,
    loading: false,
    errorItems: null,
};

const searchItemsSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItemsData: (state, action: PayloadAction<IAssets | IAssets[] | IMerchandise | IMerchandise[] | IProduct |IProduct[] | IRawMaterial | IRawMaterial[] | IService | IService[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        errorItems: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorItems = action.payload;
        },
        getItemsStart: (state, action: PayloadAction<IAssets | IAssets[] | IMerchandise | IMerchandise[] | IProduct |IProduct[] | IRawMaterial | IRawMaterial[] | IService | IService[]>) => {
            state.loading = true;
            state.items = action.payload;
            state.errorItems = null;
        },

    },
});

export const {
    setItemsData,
    errorItems,
    getItemsStart,
} = searchItemsSlice.actions;
export default searchItemsSlice.reducer;