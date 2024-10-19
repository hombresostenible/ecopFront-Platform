import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice/userSlice';
import branchReducer from './User/02BranchSlice/branchSlice';
import assetsReducer from './User/03Inventories/01InventoryAssetsSlice/assetsSlice';
import merchandiseReducer from './User/03Inventories/02InventoryMerchadisesSlice/merchandiseSlice';
import productReducer from './User/03Inventories/03InventoryProductsSlice/productSlice';
import rawMaterialReducer from './User/03Inventories/04InventoryRawMateralsSlice/rawMaterialSlice';
import serviceReducer from './User/03Inventories/05InventoryServicesSlice/serviceSlice';
import accountsBookReducer from './User/04AccountsSlice/accountsBookSlice';
import electronicInvoicingReducer from './User/05ElectronicInvoicing/02ElectronicInvoicing/electronicInvoicingSlice';
import usersPlatformReducer from './User/userPlatformSlice/userPlatformSlice';
import crmClientReducer from './User/07CrmClientSlice/crmClientSlice';
import crmSupplierReducer from './User/08CrmSupplierSlice/crmSupplierSlice';
import finantialIndicatorsReducer from './User/10ReportsAndIndicators/finantialIndicators/finantialIndicatorsSlice';
import itemByBarCodeOrNameReducer from './User/itemBybarCodeOrName/itemByBarCodeOrNameSlice';
import searchItemsReducer from './User/searchItems/searchItemsSlice';

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = {
    user: userReducer,
    branch: branchReducer,
    assets: assetsReducer,
    merchandise: merchandiseReducer,
    product: productReducer,
    rawMaterial: rawMaterialReducer,
    service: serviceReducer,
    accountsBook: accountsBookReducer,
    electronicInvoicing: electronicInvoicingReducer,
    usersPlatform: usersPlatformReducer,
    crmClient: crmClientReducer,
    crmSupplier: crmSupplierReducer,
    finantialIndicators: finantialIndicatorsReducer, // Engloba a todos los slices de indicadores
    itemByBarCodeOrName: itemByBarCodeOrNameReducer,
    searchItems: searchItemsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;