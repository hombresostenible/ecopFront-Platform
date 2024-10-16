import { configureStore } from '@reduxjs/toolkit';
import accountsBookReducer from './User/04AccountsSlice/accountsBookSlice';
import assetsReducer from './User/03Inventories/01InventoryAssetsSlice/assetsSlice';
import branchReducer from './User/02BranchSlice/branchSlice';
import crmClientReducer from './User/07CrmClientSlice/crmClientSlice';
import crmSupplierReducer from './User/08CrmSupplierSlice/crmSupplierSlice';
import merchandiseReducer from './User/03Inventories/02InventoryMerchadisesSlice/merchandiseSlice';
import productReducer from './User/03Inventories/03InventoryProductsSlice/productSlice';
import rawMaterialReducer from './User/03Inventories/04InventoryRawMateralsSlice/rawMaterialSlice';
import serviceReducer from './User/03Inventories/05InventoryServicesSlice/serviceSlice';
import userReducer from './User/userSlice/userSlice';
import usersPlatformReducer from './User/userPlatformSlice/userPlatformSlice';
import finantialIndicatorsReducer from './User/indicator/finantialIndicators/finantialIndicatorsSlice';
import itemByBarCodeOrNameReducer from './User/itemBybarCodeOrName/itemByBarCodeOrNameSlice';
import searchItemsReducer from './User/searchItems/searchItemsSlice';

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = {
    accountsBook: accountsBookReducer,
    assets: assetsReducer,
    branch: branchReducer,
    crmClient: crmClientReducer,
    crmSupplier: crmSupplierReducer,
    merchandise: merchandiseReducer,
    product: productReducer,
    rawMaterial: rawMaterialReducer,
    service: serviceReducer,
    user: userReducer,
    usersPlatform: usersPlatformReducer,
    finantialIndicators: finantialIndicatorsReducer, // Engloba a todos los slices de indicadores
    itemByBarCodeOrName: itemByBarCodeOrNameReducer,
    searchItems: searchItemsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;