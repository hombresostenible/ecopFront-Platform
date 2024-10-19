import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../../types/UserPanel/03Inventories/products.types';

interface ProductState {
    product: IProduct | IProduct[] | null;
    productOff: IProduct | IProduct[] | null;
    loading: boolean;
    totalRegisters: number;
    totalPages: number;
    currentPage: number;
    errorProduct: string[] | null;
}

const initialState: ProductState = {
    product: null,
    productOff: null,
    loading: false,
    totalRegisters: 0,
    totalPages: 0,
    currentPage: 0,
    errorProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productData: (state, action: PayloadAction<IProduct | null>) => {
            state.loading = false;
            state.product = action.payload;
        },
        errorProduct: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorProduct = action.payload;
        },
        postProductStart: (state, action: PayloadAction<IProduct  | null>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        postManyProductsStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductsStart: (state, action: PayloadAction<IProduct>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductsPaginatedStart: (state, action: PayloadAction<{ registers: IProduct[], totalRegisters: number, totalPages: number, currentPage: number }>) => {
            state.loading = true;
            state.product = action.payload.registers;
            state.totalRegisters = action.payload.totalRegisters;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.errorProduct = null;
        },
        getProductByIdStart: (state, action: PayloadAction<IProduct>) => {
            state.loading = false;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductsByBranchStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductsOffStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.productOff = action.payload;
            state.errorProduct = null;
        },
        putProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
        putManyProductsStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        patchProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
        patchAddInventoryProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
        deleteProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
    },
});

export const { productData, errorProduct, postProductStart, postManyProductsStart, getProductsStart, getProductsPaginatedStart, getProductByIdStart, getProductsByBranchStart, getProductsOffStart, putProductStart, putManyProductsStart, patchProductStart, patchAddInventoryProductStart, deleteProductStart } = productSlice.actions;
export default productSlice.reducer;